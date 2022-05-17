// external
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import CloseIcon from '@mui/icons-material/Close';
import {useState} from "react";
// internal
import {setActive, updateDraft} from "../redux/logRedux";
import {sendLog} from "../redux/logApiCalls";
// conf
import {COLOR_FIVE, COLOR_FOUR, COLOR_THREE, COLOR_TWO} from "../conf";


export const BlurContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: ${({show}) => show !== false ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 10;
`;
export const FormContainer = styled.div`
  background-color: white;
  padding: 3rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  width: 20rem;

`;
const Title = styled.h1`
  &:after {
    //content: "x"
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;

  div {
    margin: 0.5rem 0;

    * {
      margin: 0 0.25rem;
    }
  }
`;
// const CreateMovementButton = styled.button`
//   //height: 2rem;
//   cursor: pointer;
// `;
const ButtonSubmit = styled.button`
  cursor: pointer;
	background-color: ${COLOR_THREE};
	border: 2px solid ${COLOR_THREE};
	font-weight: bold;
	color: ${COLOR_FOUR};
	border-radius: 5px;
	padding: 0.25rem 0;
	font-size: 1rem;
	&:hover {
		//background-color: ${COLOR_FOUR};
    background-color: white;
		color: ${COLOR_TWO};
	}
`;
export const HeaderWrapper = styled.div`
  display: flex;
  //flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

`;
const MovementWrapper = styled.div`
  //background-color: green;
  display: flex;
  justify-content: space-between;

  h1 {
    color: green;

    span {
      font-size: 1.5rem;
    }
  }
`;
const DataContainer = styled.div`
  //background-color: blue;
  display: flex;
  justify-content: space-between;
`;
export const DataWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 4rem;

  label {
    text-transform: capitalize;
  }

  &:hover:after {
    color: ${COLOR_TWO};
    position: absolute;
    background: white;
    max-width: 6rem;
    font-size: 0.65rem;
    display: block;
    border: 1px solid ${COLOR_THREE};
    border-radius: 10px;
    padding: 0.5rem;
    transform: translate(-25%, -100%);
  }

  &#close {
    cursor: pointer;
    align-items: end;
    //transform: translate(25%, -400%);

    &:hover {
      color: red;
    }
  }

  &#close:hover:after {
    content: "Close";
  }

  &#strain:hover:after {
    content: "How much you did.";
  }

  &#reps:hover:after {
    content: "How many reps in each set.";
  }

  &#sets:hover:after {
    content: 'How many "times".';
  }

  &#time:hover:after {
    content: "time, in minutes";
  }

  &#note:hover:after {
    content: "What did you like about it? what don't what's next? write something, keep motivated!!";
  }

  &#note {
    display: flex;
    width: 100%;

    textarea {
      width: 100%;
      resize: none;
      height: 3rem;
    }
  }
`;
const Error = styled.span`
  position: absolute;
  border: 1px solid ${COLOR_THREE};
  background-color: ${COLOR_FIVE + "95"};
  backdrop-filter: blur(2px);
  padding: 1rem;
  border-radius: 5px;
  width: 18rem;
  font-weight: bold;
`;

const AddLog = () => {
	// extract all the data from store
	const goals = useSelector((state) => state.training.goals);
	const drafts = useSelector((state) => state.log.drafts);
	// let activeDraft = drafts.filter(draft => draft.active === true)[0];
	const [activeDraft, setActiveDraft] = useState(drafts.filter(draft => draft.active === true)[0]);
	const activeDraftGoal = useSelector((state) => state.log.active);
	const [errorMessage, setErrorMessage] = useState(null);
	const dispatch = useDispatch();
	// feed the states

	const [movementForm, setMovementForm] = useState(activeDraft.movement === "" ? goals[0].movement : activeDraft.movement);
	const [repsForm, setRepsForm] = useState(activeDraft.reps);
	const [setsForm, setSetsForm] = useState(activeDraft.sets);
	const [strainForm, setStrainForm] = useState(activeDraft.strain);
	const [durationForm, setDurationForm] = useState(activeDraft.duration);
	const [notesForm, setNotesForm] = useState(activeDraft.notes);


	const handleCancel = () => {
		// save the draft -> draft.active=false
		// get the index by date and movement

		dispatch(updateDraft({
			date: activeDraft.date,
			movement: movementForm,
			reps: repsForm,
			sets: setsForm,
			strain: strainForm,
			unit: (goals.filter(goal => goal.movement === movementForm))[0].unit,
			duration: durationForm,
			notes: notesForm,
			active: false,
		}));
		// close the form
		dispatch(setActive(false));
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		// check if everything have an integer value
		if ([+repsForm, +setsForm, +strainForm, +durationForm].includes(NaN)) {
			setErrorMessage('ERROR: The input is invalid, must be an integer.');
			setTimeout(setErrorMessage, 2000, null);
			return;
		}
		const newLog = {
			user: goals[0].user,
			date: activeDraft.date,
			movement: movementForm,
			reps: repsForm,
			sets: setsForm,
			unit: (goals.filter(goal => goal.movement === movementForm))[0].unit,
			strain: strainForm,
			duration: durationForm,
			notes: notesForm || '',
		};
		// send to mongo and slice
		sendLog(dispatch, newLog);

	};
	const handleChange = (mov) => {
    // bug is one draft change behind
		setMovementForm(mov);
		const newActiveDraft = drafts.filter(el => (el.date === activeDraft.date) && (el.movement === mov));
		let emptyDraft = {
			movement: mov,
			active: true,
			date: activeDraft.date,
		};
		if (newActiveDraft.length > 0) {
			setActiveDraft(newActiveDraft[0]);
		} else {
			setActiveDraft(emptyDraft);
		}
		setNotesForm(activeDraft.notes ? activeDraft.notes : "");
		setStrainForm(activeDraft.strain ? activeDraft.strain : "");
		setSetsForm(activeDraft.sets ? activeDraft.sets : "");
		setRepsForm(activeDraft.reps ? activeDraft.reps : "");
		setDurationForm(activeDraft.duration ? activeDraft.duration : "");
	};
	return (
		<BlurContainer show={true}>
			<FormContainer>
				<HeaderWrapper>
					<Title>{activeDraft && (new Date(activeDraft.date)).toDateString()}</Title>
					{/*<CreateMovementButton>Create new goal</CreateMovementButton>*/}
					<DataWrap id="close">
						<CloseIcon onClick={handleCancel}/>
					</DataWrap>
				</HeaderWrapper>
				<Form>
					<MovementWrapper>
						{/*if draft have a movement, select from there, otherwise from goals*/}
						{activeDraftGoal === "" ? (
								<select onChange={(e) => handleChange(e.target.value)} value={movementForm}>
									{goals.map((goal, index) =>
										<option key={index} value={goal.movement}>{goal.movement} ({goal.unit})</option>
									)}
								</select>
							) :
							<h1>{activeDraft.movement}
								<span>({
									activeDraft.movement === "" ?
										null
									: (goals.find(goal => goal.movement === activeDraft.movement)).unit
								})</span>
							</h1>}
					</MovementWrapper>
					<DataContainer>
						<DataWrap id="strain">
							<label>{activeDraft.movement !== "" ? goals.find(goal => goal.movement === activeDraft.movement).unit : "Strain"}</label>
							<input placeholder="90" onChange={(e) => setStrainForm(e.target.value)} value={strainForm}/>
						</DataWrap>
						<DataWrap id="reps">
							<label>Reps</label>
							<input placeholder="" onChange={(e) => setRepsForm(e.target.value)} value={repsForm}/>
						</DataWrap>
						<DataWrap id="sets">
							<label>Sets</label>
							<input placeholder="" onChange={(e) => setSetsForm(e.target.value)} value={setsForm}/>
						</DataWrap>
						<DataWrap id="time">
							<label>Time</label>
							<input placeholder="10" onChange={(e) => setDurationForm(e.target.value)} value={durationForm}/>
						</DataWrap>
					</DataContainer>
					<DataWrap id="note">
						<label>Additional note</label>
						<textarea onChange={(e) => setNotesForm(e.target.value)} value={notesForm}/>
					</DataWrap>
					{errorMessage ? <Error>{errorMessage}</Error> : null}
					<ButtonSubmit onClick={(e) => handleSubmit(e)}>Log It!</ButtonSubmit>
				</Form>
			</FormContainer>
		</BlurContainer>
	);
};

export default AddLog;
