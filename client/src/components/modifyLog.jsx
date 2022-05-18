// external
import styled from "styled-components";
import {useSelector, useDispatch} from "react-redux";
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
// internal
import {BlurContainer, HeaderWrapper} from "./addLog";
import {useState} from "react";
// conf
import {COLOR_FOUR, COLOR_THREE, COLOR_TWO, PRIMARY, SECONDARY} from "../conf";
import {editLog} from "../redux/goalRedux";
import {goalExpiration, prettierDate} from "./helper";
import {deleteLog, updateLog} from "../redux/logApiCalls";

const Container = styled.div`
  padding: 0 0 1rem 0;
  margin: 1rem 0;
  border-radius: 3px;
  background-color: ${COLOR_THREE};
  display: flex;
  flex-direction: column;
  width: 100%;
  font-family: 'Comfortaa', cursive;
  h4 {
    margin-left: 1rem;
  }
  svg {
    display: none;
    position: absolute;
    color: ${PRIMARY};
    transform: translate(0, -50%);
  }
  span {
    margin: 0.25rem 1rem;
    cursor: pointer;
    display: inline-block;
    text-justify: inter-word;
    font-size: 0.85rem;
    font-weight: 100;
    letter-spacing: -0.06rem;
    &:hover {
      &:before {
        content: "click to edit";
        position: absolute;
        color: ${COLOR_FOUR};
        border: 1px solid ${COLOR_THREE};
        background-color: ${COLOR_TWO + "90"};
        backdrop-filter: blur(2px);
        padding: 0.25rem 0.5rem;
        border-radius: 5px;
        transform: translate(0, -100%)
      }
      svg {
        display: inherit;
      }
    }
    &#span-strain {
    }
    &#span-notes {
    }
  }
  

`;
const GoalHeader = styled.div`
  font-family: 'Comfortaa', cursive;
  color: ${COLOR_FOUR};
  background-color: ${COLOR_TWO};
  padding: 0.75rem;
  border-radius: 0 5px 5px 5px;
  border: 1px solid ${SECONDARY};
  span {
    text-transform: capitalize;
    font-size: 0.8rem;
    font-weight: bold;
    color: ${COLOR_THREE};
  }
  span.goal {
    text-decoration: underline ${PRIMARY};
    letter-spacing: 0.15rem;
  }
`;
const FormContainer = styled.div`
  background-color: white;
  padding: 1rem 3rem 3rem 3rem;
  border-radius: 1rem;
  display: ${({show}) => show ? "flex" : "none"};
  flex-direction: column;
  width: 20rem;
  align-items: end;
  svg {
    margin: 0.5rem 0;
    cursor: pointer;
    &:hover {
      color: red;
    }
  }
`;
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  width: 100%;
  span {
    font-family: 'Cinzel', serif;
  }
  &:before {
    content: "goal";
    transform: translate(0, 1px);
    background-color: ${COLOR_TWO};
    color: ${SECONDARY};
    padding: 0.25rem;
    font-weight: bold;
    border-radius: 5px 5px 0 0;
    z-index: 1;
    border: 1px solid ${SECONDARY};
    border-bottom: none;
    
    font-size: 0.625rem;
    line-height: 1.1;
    text-transform: uppercase;
    letter-spacing: 0.3rem;
  }
`;
const EditDialog = styled.div`
  display: ${({show}) => show ? 'flex' : 'none'};
  background-color: white;
  padding: 2rem 3rem 3rem 3rem;
  border-radius: 1rem;
  flex-direction: column;
  div.dialogHeader {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    align-items: center;
    svg:hover {color: red; cursor: pointer;} 
  }
  div button {
    cursor: pointer;
  }
`;
const Error = styled.span`
  color: red;
  transform: translate(0, -1.3rem);
  position: absolute;
  font-weight: bold;
  font-size: 0.75rem;
`;
const ConfirmDialog = styled.div`
  display: ${({show}) => show ? 'flex' : 'none'};
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;
  span {
    padding: 1rem;
  }
`;
const Button = styled.button`
    cursor: pointer;
    padding: 0.15rem 0.35rem;
    font-weight: bold;
    border-radius: 5px;
    margin: 0.25rem 0.5rem;
    width: 4rem;
    &.cancelBtn {
      background-color: ${COLOR_THREE};
      border: solid 2px ${COLOR_THREE};
      &:hover {
        color: ${COLOR_THREE};
        background-color: ${SECONDARY};
      }
    }
    &.saveBtn {
      background-color: green;
      border: solid 2px green;
      &:hover {
        color: green;
        background-color: ${SECONDARY};
      }
    }
    &.deleteBtn {
      background-color: red;
      border: solid 2px red;
      &:hover {
        color: red;
        background-color: ${SECONDARY};
      }
    }
`
const ModifyLog = () => {
  const dispatch = useDispatch();
  const log = useSelector((state) => state.training.showing);
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const [strain, setStrain] = useState(log.strain);
  const [sets, setSets] = useState(log.sets);
  const [reps, setReps] = useState(log.reps);
  const [duration, setDuration] = useState(log.duration);
  const [notes, setNotes] = useState(log.notes);
  const [connectChange, setConnectChange] = useState(null);
  const [change, setChange] = useState('');
  const [saveDraft, setSaveDraft] = useState(false);
  // show the save button
  const [edited, setEdited] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const goals = useSelector((state) => state.training.goals);
  const user = useSelector((state) => state.user.currentUser.email);
  const handleConfirmDelete = () => {
    console.log(log)
    deleteLog(dispatch, log);
    // reset everything
    setConfirmDeleteDialog(false);
    setChange(0);
    setShowDialog(false);
    setErrorMessage(null);
    setEdited(false);
  };
  const handleCancel = () => {
    setChange(0);
    if (showDialog) {
      setShowDialog(false);
      setErrorMessage(null);
    } else {
      dispatch(editLog(false));
    }
    setEdited(false);
    setConfirmDeleteDialog(false);
  };
  const handleChange = (event) => {
      switch (connectChange) {
        case 'strain':
          setStrain(event);
          break;
        case 'reps':
          setReps(event);
          break;
        case 'sets':
          setSets(event);
          break;
        case 'duration':
          setDuration(event);
          break;
        case 'notes':
          setNotes(event);
          break;
      }
  };
  const handleEdit = (param) => {
    setSaveDraft(param);
    switch (param) {
      case 'strain':
        setChange(log.strain);
        break;
      case 'reps':
        setChange(log.reps);
        break;
      case 'sets':
        setChange(log.sets);
        break;
      case 'duration':
        setChange(log.duration);
        break;
      case 'notes':
        setChange(log.notes);
        break;
    }
    setEdited(true);
    setShowDialog(true);
    setConnectChange(param);
  };
  const handleSave = () => {
    if (showDialog) {
      // validation of the input
      if (!isNaN(+change) || saveDraft === 'notes') {
        handleChange(change);
        setShowDialog(false);
        setErrorMessage(null);
      } else {
        // trigers the invalid value
        if (saveDraft !== 'notes') setErrorMessage('Should be integer value');
      }
      // here is pressed save to save the edited field
    } else {
      // here is pressed save to save the log
      handleChange(change);
      setChange(0);
      editedLog['_id'] = log._id;
      editedLog['user'] = user
      updateLog(dispatch, editedLog);
    }
  };
  const handleCancelDelete = () => {
    setConfirmDeleteDialog(false);
  };
  const handleDelete = () => {
    if (confirmDeleteDialog) {
      handleConfirmDelete();
    }
    setConfirmDeleteDialog(true);
  };
  let editedLog = { sets, strain, reps, duration, notes, };

  const goal = goals ? goals.filter(goal => goal.movement ===  log.movement)[0] : goals[0];
  const expiration = goalExpiration(goal.start, goal.timeFrame);
    return (
      <BlurContainer>
        <EditDialog show={showDialog}>
          <div className="dialogHeader">
            {saveDraft} {saveDraft === 'strain' ? "in " + log.unit : null}
            {errorMessage ? <Error>Error: {errorMessage}</Error> : null}
            <CloseIcon onClick={handleCancel}/>
          </div>
          <div>
            <input
              onChange={(e) => setChange(e.target.value)}
              value={change}
              required
            />
            <Button className="saveBtn" onClick={handleSave}>save</Button><Button className="cancelBtn" onClick={handleCancel}>cancel</Button>
          </div>
        </EditDialog>
        <ConfirmDialog show={confirmDeleteDialog}>
          <span>Do you really want to delete?</span>
          <div>
            <Button className="cancelBtn" onClick={handleCancelDelete}>cancel</Button>
            <Button className="deleteBtn" onClick={handleDelete}>delete</Button>
          </div>
        </ConfirmDialog>
        <FormContainer show={!showDialog && !confirmDeleteDialog}>
          <HeaderContainer>
            <CloseIcon onClick={handleCancel}/>
          </HeaderContainer>
          <HeaderWrapper>
            <GoalHeader>
              <span className="goal">{goal.movement} {goal.quantity}{goal.unit}</span> before <span>{expiration.expiration.toDateString()} ({expiration.daysLeft} days left)</span>
            </GoalHeader>
          </HeaderWrapper>
          <Container>
            {/*<h4>{prettierDate(log.date)}</h4>*/}
            <h4>{(new Date(log.date)).toDateString()}</h4>
            <div>
              <span id="span-strain" onClick={()=>{handleEdit('strain');}}>strain: {strain}{log.unit}<EditIcon/></span>
            </div>
            <div>
              <span id="span-sets" onClick={()=>{handleEdit('sets');}}>{sets} sets<EditIcon/></span>
              <span id="span-reps" onClick={()=>{handleEdit('reps');}}>of {reps} reps<EditIcon/></span>
              <span id="span-duration" onClick={()=>{handleEdit('duration');}}>in {duration} min.<EditIcon/></span>
            </div>
            <div>
              <span id="span-notes" onClick={()=>{handleEdit('notes');}}>{notes ? notes : "You didn't save any note"}<EditIcon/></span>
            </div>
          </Container>

          {edited ? <Button className="saveBtn" onClick={handleSave}>save</Button> : null}
          <div>
            <Button className="cancelBtn" onClick={handleCancel}>cancel</Button>
            <Button className="deleteBtn" onClick={handleDelete}>delete</Button>
          </div>
        </FormContainer>
      </BlurContainer>
    );
};

export default ModifyLog;
