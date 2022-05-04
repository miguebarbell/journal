// external
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloseIcon from '@mui/icons-material/Close';
// internal
import AddGoal from "../components/addgoal";
import {logOut} from "../redux/userRedux";
// conf and variables
import {COLOR_FOUR, NAVBAR_HEIGHT, COLOR_THREE, COLOR_TWO, PRIMARY, SECONDARY} from "../conf";
import {profileBanner} from "../components/quotes";
import GoalChart from "../components/goalChart";
import {BlurContainer, DataWrap, FormContainer, HeaderWrapper} from "../components/addLog";
import {prettierDate} from "../components/helper";
import {editThisGoal} from "../redux/goalApiCalls";

const Author = styled.span`
  font-size: 0.75rem;
  font-weight: bold;
  font-family: 'Cinzel', serif;
`;
const Container = styled.div`
  color: ${COLOR_FOUR};
  background-color: ${COLOR_TWO};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: calc(100vh - ${NAVBAR_HEIGHT});

  div#edit-container {
    color: black;
  }
`;
const EditButton = styled.button`
  border: 1px solid black;
  border-radius: 5px;
  cursor: pointer;
  padding: 0.5rem;
  margin: 0 5px;
  font-weight: bold;
  background-color: ${PRIMARY};
  color: ${COLOR_FOUR};

  &:hover {
    background-color: ${SECONDARY};
    color: ${COLOR_TWO};
  }
`;
const Title = styled.h1`
  font-family: 'Permanent Marker', cursive;
`;
const LogoutButton = styled.button`
  border: 1px solid black;
  border-radius: 5px;
  cursor: pointer;
  padding: 0.5rem;
  margin: 0 5px;
  background-color: red;
  font-weight: bold;
  color: ${COLOR_FOUR};

  &:hover {
    background-color: ${SECONDARY};
    color: ${COLOR_TWO};
  }
`;
const InfoWrapper = styled.div`
  max-height: 30vh;
  display: flex;
  align-items: center;
  border-bottom: 1px groove ${COLOR_FOUR};

  * {
    margin: 1rem;
  }
`;
const ProfilePicture = styled.img`
  border-radius: 50%;
  height: 15vh;
  width: 15vh;
  background-image: linear-gradient(27deg, ${PRIMARY}, ${SECONDARY})
`;
const MotivationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Quote = styled.span`
  font-style: italic;
  font-size: 1.5rem;
  font-family: 'Just Another Hand', cursive;
`;
const GoalsContainer = styled.div`
  padding: 1rem;
`;
const GoalCard = styled.div`
  box-shadow: 0 0 5px ${COLOR_FOUR};
  background-color: ${COLOR_THREE};
  margin: 1rem;
  padding: 1rem;
  border-radius: 10px;

  div#strain {
    display: flex;
    justify-content: space-between;
    align-items: center;

    color: ${COLOR_TWO};

    &:nth-child(2) {
      font-family: 'Share Tech Mono', monospace;
      text-align: end;
    }

    div {

      span:nth-child(1) {
        font-weight: bold;
        font-size: 1.5rem;
      }

      span:nth-child(2),
      span:nth-child(1) {
        font-family: 'Permanent Marker', cursive;
      }

    }
  }

  div#movement {
    font-weight: bold;
    font-size: 2rem;
    display: flex;
    justify-content: space-between;

    span:nth-child(2) {
      font-family: 'Rock Salt', cursive;
      text-transform: capitalize;
      margin: 0 1rem;
      padding: 0 0.25rem;
      cursor: pointer;
      //border: 2px solid transparent;
      border-radius: 5px;

      &:after {
        display: none;
        content: "display it.";
        position: absolute;
        transform: translate(0, 1.5rem);
        padding: 0.25rem 0.5rem;
        font-size: 0.85rem;
        font-family: 'Comfortaa', cursive;
        //border: 2px solid transparent;
        border-radius: 0 5px 5px 0;
        border-left: 0;
        z-index: 1;
        color: ${COLOR_TWO};
      }

      &:hover {
        //border-color: blue;
          //background-image: linear-gradient(${SECONDARY + "90"}, ${PRIMARY + "85"});
        &:after {
          display: inline-block;
            //background-image: linear-gradient(${PRIMARY}, ${SECONDARY});
          //border-color: blue;
        }
      }
    }

    span:nth-child(4) {
      font-family: 'Share Tech Mono', monospace;
      color: ${COLOR_TWO};
    }

    span#left {
      font-size: 1rem;
      font-weight: lighter;
    }

    svg {
      display: none;
      position: absolute;
      transform: translate(5rem, -0.5rem);
      color: red;
      cursor: pointer;

      &:after {
        content: "edit";
        position: absolute;
      }
    }

    &:hover svg {
      display: block;
    }
  }
`;
const EditGoalContainer = styled.div`
	display: flex;
	flex-direction: column;
  font-size: 1rem;
  text-align: center;
	&:first-child {
	}
	div.container {
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		flex-direction: column;
		padding: 0 0.5rem;
		border: 2px solid ${COLOR_THREE};
		background-color: ${COLOR_THREE};
		margin-bottom: 1rem;
    border-radius: 5px;
		div {
			display: flex;
			flex-direction: row;
      justify-content: space-between;
			width: 100%;
			padding-bottom: 0.5rem;
		}
		
	}
`;
const Input = styled.input`
  cursor: pointer;
  border: none;
  width: ${({rems}) => rems ? rems.split("").length + 'rem' : 'inherit'};
  font-family: 'Cantarell', sans-serif;
	font-weight: bold;
  font-size: 1rem;
  text-align: center;
	text-transform: capitalize;
  background-color: ${COLOR_THREE};
  &:before {
      font-weight: normal;
      //background-color: white;
      content: "Edit";
      //position: absolute;
      transform: translate(0, -2rem);
      display: none;
      padding: 0.15rem 0.25rem;
      border: 1px solid ${COLOR_THREE};
      border-radius: 5px;
    }

    &:hover {
      color: ${COLOR_TWO};
      text-decoration: underline;

      &:before {
        display: inline-block;
      }
    }
  }
`;
const TextArea = styled.textarea`
  width: ${({rems}) => rems ? rems.split("").length + 'em' : 'inherit'};
	max-height: 3rem;
	border: none;
	cursor: pointer;
  font-family: 'Cantarell', sans-serif;
  font-weight: bold;    
	background-color: ${COLOR_THREE};
  &:hover {
    color: ${COLOR_TWO};
    text-decoration: underline;
`;
const Button = styled.button`
  text-transform: capitalize;
  color: white;
  font-weight: bold;
  cursor: pointer;
  padding: 0.15rem 0.5rem;
  border-radius: 5px;
	display: ${({show}) => show !== false ? 'inline-block' : 'none'};
  &#save {
    border: 2px solid green;
    background-color: green;
    &:hover {
      background-color: white;
      color: green;
    }
  }
  &#cancel {
    border: 2px solid red;
    background-color: red;

    &:hover {
      background-color: white;
      color: red;
    }
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Plan = styled.select`
	border: none;
	background: none;
  cursor: pointer;
  font-family: 'Cantarell', sans-serif;
  font-weight: bold;
	&:hover { 
		text-decoration: underline;
	}
	option {
		background: none;
	}
`;

const Profile = () => {
	const motivationQuote = profileBanner[Math.floor(Math.random() * profileBanner.length)];
	const dispatch = useDispatch();
	const handleLogout = () => {
		dispatch(logOut());
	};
	const [displayingGoal, setDisplayingGoal] = useState(false);
	const [displayingGraph, setDisplayingGraph] = useState(false);
	const [goalEdit, setGoalEdit] = useState(false);
	const [goalPlan, setGoalPlan] = useState(goalEdit.plan);
	const [goalQuantity, setGoalQuantity] = useState(goalEdit.quantity);
	const [goalUnit, setGoalUnit] = useState(goalEdit.unit);
	const [goalTimeFrame, setGoalTimeFrame] = useState(goalEdit.timeFrame);
	const [goalStartTime, setGoalStartTime] = useState(goalEdit.start);
	const [goalNotes, setGoalNotes] = useState(goalEdit.notes);
	const [editedGoal, setGoalEdited] = useState(false)
	const timeReview = 30;
	const addGoal = () => {
		setDisplayingGoal(true);
		document.title = "Adding goal.";
	};
	const handleEditGoal = (goal) => {
		setGoalEdit(goal)
	};
	const handleCancel = () => {
		setGoalEdit(false)
	};
	const user = useSelector((state) => state.user.currentUser);
	const goals = useSelector((state) => state.training.goals);
	const logs = useSelector((state) => state.training.logs);
	const timeFrame = (startDay, daysToComplete) => {
		// const stringDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		// const stringMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		const beginDay = new Date(startDay);
		const finishDay = new Date(startDay);
		finishDay.setDate(beginDay.getDate() + daysToComplete);
		const daysLeftToComplete = Math.round((finishDay - new Date()) / (1000 * 60 * 60 * 24));
		const weeks = Math.floor(daysLeftToComplete / 7);
		const rest = daysLeftToComplete % 7;
		return {
			left: daysLeftToComplete,
			weeks: weeks,
			rest: rest
		};
	};
	const accumulative = (goal, days) => {
		// accept goal string and return a number
		let logsForGoal;
		if (days === 0) logsForGoal = logs.filter(log => log.movement === goal);
		else logsForGoal = logs.filter(log => (log.movement === goal) && (new Date(log.date) >= (new Date()).setDate(new Date().getDate() - days)));
		const response = {
			goal,
			strain: 0,
			sets: 0,
			reps: 0,
			duration: 0,
			avgStrainPerSet: 0,
		};
		logsForGoal.forEach(log => {
			response.strain += log.strain
			response.sets += log.sets
			response.reps += log.reps
			response.duration += log.duration
		})
		response.avgStrainPerSet = isNaN(response.strain / response.sets) ? 0 : Math.round(response.strain / response.sets);
		return response;
	};
	const accumulatedGoals = goals.map(goal => accumulative(goal.movement, timeReview))
	const trimValue = (value) => {
		if (value === String("")) return ' ';
		else if (value < 1) return 1;
		return value
	}
	const handleSave = () => {
		const editedGoal = {
			movement: goalEdit.movement,
			user: user.email,
			quantity: goalQuantity ? goalQuantity : goalEdit.quantity,
			unit: goalUnit ? goalUnit : goalEdit.unit,
			timeFrame: goalTimeFrame ? goalUnit : goalEdit.timeFrame,
			start: goalStartTime ? goalStartTime : goalEdit.start,
			plan: goalPlan ? goalPlan : goalEdit.plan,
			notes: goalNotes ? goalNotes : goalEdit.notes,
		}
		editThisGoal(dispatch, editedGoal)
		handleCancel()
	}
	return (
		<Container>
			<BlurContainer show={goalEdit} id="edit-container">
				<FormContainer>
          <HeaderWrapper>
						<h2>{goalEdit.movement} goal</h2>
						<DataWrap id="close">
							<CloseIcon onClick={handleCancel}/>
						</DataWrap>
					</HeaderWrapper>
					<EditGoalContainer>
						<div className="container">
							<h3>Goal</h3>
							<div>

							<Plan
								value={goalPlan ? goalPlan : goalEdit.plan}
								rems={goalEdit.plan}
								onChange={(e) => {
									setGoalPlan(e.target.value)
									setGoalEdited(true)
								}}
							>
								<option value="test">Max Attempt</option>
								<option value="accu">Accumulate</option>
								<option value="habit">Every Day</option>
							</Plan>
							&nbsp;
							<span>
								{goalEdit.movement}
							</span>
							&nbsp;
							<Input
								value={goalQuantity ? goalQuantity : goalEdit.quantity}
								rems={goalQuantity ?
									`${goalQuantity}`.split("").length < `${goalEdit.quantity}+`.split("").length ? `${goalQuantity}+` : `${goalEdit.quantity}+`
									: `${goalEdit.quantity}+`}
								placeholder={goalEdit.quantity}
								type="number"
								onChange={(e) => {
									setGoalQuantity(trimValue(e.target.value))
									setGoalEdited(true)
								}}
							/>
							&nbsp;
							<Plan
								value={goalUnit ? goalUnit : goalEdit.unit}
								rems={goalEdit.unit}
								onChange={(e) => {
									setGoalUnit(e.target.value)
									setGoalEdited(true)
								}}
							>
								<option value="kgs">Kilos</option>
								<option value="lbs">Pounds</option>
								<option value="min">Minutes</option>
								<option value="mts">Meters</option>
								<option value="fts">Feet</option>
								{
									goalPlan === 'habit' || goalPlan === 'accu' ? <option value="times">Times</option> : null
								}
							</Plan>
							</div>
						</div>
						<div className="container">
							<h3>TIMEFRAME</h3>
							<div>

            <Input
	            value={goalTimeFrame ? goalTimeFrame : goalEdit.timeFrame}
	            rems={`${goalEdit.timeFrame}+`}
	            placeholder={goalEdit.timeFrame}
	            type="number"
	            onChange={(e) => {
								setGoalTimeFrame(trimValue(e.target.value))
		            setGoalEdited(true)
	            }}
            />
							<span>days from</span>
							<Input
								value={goalStartTime ? goalStartTime : prettierDate(goalEdit.start)}
								rems={prettierDate(goalEdit.start)}
								placeholder={prettierDate(goalEdit.start)}
								onChange={(e) => {
									setGoalStartTime(e.target.value === "" ? new String("") : e.target.value)
									setGoalEdited(true)
								}}
							/>
						</div>
						<div>
							<TextArea
								value={goalNotes ? goalNotes : goalEdit.notes}
								rems={goalEdit.notes}
								placeholder={goalEdit.notes}
								onChange={(e) => {
									setGoalNotes(e.target.value === "" ? new String("") : e.target.value)
									setGoalEdited(true)
								}}
							/>
						</div>
						</div>
					</EditGoalContainer>
					<ButtonContainer>
						<Button show={editedGoal} id="save" onClick={handleSave}>save</Button>
						<Button show={true} id="cancel" onClick={handleCancel}>cancel</Button>
					</ButtonContainer>
				</FormContainer>
			</BlurContainer>
			<InfoWrapper>
				<ProfilePicture src={`https://avatars.dicebear.com/api/bottts/${user.email}.svg`}/>
				<Title>Hi {user.name}</Title>
				<MotivationWrapper>
					<Quote>{motivationQuote.text}</Quote>
					<Author>{motivationQuote.author}</Author>
				</MotivationWrapper>
			</InfoWrapper>
			<GoalsContainer>
				{goals.map((goal, index) => (
					<div key={index}>
						<GoalCard>
							<div id="movement">
								<span>🏅</span>
								<span onClick={() => setDisplayingGraph(goal.movement)}>{goal.movement}</span>
								<EditOutlinedIcon onClick={() => handleEditGoal(goal)}/>
								<span id="left">{
									(timeFrame(goal.start, goal.timeFrame)).left > 0 ?
										`${(timeFrame(goal.start, goal.timeFrame)).left} days left` :
										"expired"
								}</span>
							</div>
							<div id="strain">
								<div>
									<span>{goal.quantity}</span>
									&nbsp;
									<span>{goal.unit}</span>
								</div>
								<span>
                    {(timeFrame(goal.start, goal.timeFrame)).weeks > 0 ? "in " : ""}
									{(timeFrame(goal.start, goal.timeFrame)).weeks > 0 ? `${(timeFrame(goal.start, goal.timeFrame)).rest} weeks ` : ""}
									{(timeFrame(goal.start, goal.timeFrame)).rest > 0 ? `${(timeFrame(goal.start, goal.timeFrame)).rest} days` : ""}
                  </span>
							</div>
						</GoalCard>
						<GoalChart goal={goal} show={displayingGraph}/>
					</div>

				))}
			</GoalsContainer>
			<EditButton onClick={() => {
				addGoal();
			}}>ADD A NEW GOAL</EditButton>
			<span>you should focus in one at time</span>
			<h2>Last {timeReview} days:</h2>
			<h3>Time</h3>
			{accumulatedGoals.map((goal, index) => <span key={index}>{goal.goal} : {goal.duration}</span>)}
			<h3>Distance</h3>
			<h3>Strain</h3>
			{accumulatedGoals.map((goal, index) => <span key={index}>{goal.goal} : {goal.strain}</span>)}
			{displayingGoal ? <AddGoal/> : null}
			<LogoutButton onClick={() => {
				handleLogout();
			}}>Log Out</LogoutButton>
		</Container>
	);
};

export default Profile;
