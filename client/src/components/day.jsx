// external
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import PageviewIcon from '@mui/icons-material/Pageview';

// internal
import {addDraft, setActive, setDraftActive} from "../redux/logRedux";
//conf
import {COLOR_THREE, PRIMARY, PRIMARY_DISABLED, SECONDARY} from "../conf";

const Container = styled.div`
  svg {
    display: none;
  }
  &:hover {
    svg {
      display: inherit;
      &:hover {
      }
    }
  }
  font-family: 'Comfortaa', cursive;
  position: relative;
  background-color: ${({today}) => today ? COLOR_THREE + "50" : "inherit"};
  border: 1px solid ${PRIMARY_DISABLED};
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 1fr 2fr 1fr;
  grid-template-areas: "month center1 day" "goal goal goal" "check center2 behind";
  cursor: pointer;
  &:hover {
    border-color: ${SECONDARY};
  }
`;

const DayContainer = styled.span`
  grid-area: day;
  text-align: end;
  color: ${COLOR_THREE};
  font-weight: bold;
  font-size: 0.75rem;
  z-index: 1;
`;

const MonthContainer = styled.span`
  grid-area: month;
  font-family: 'Cinzel', serif;
  text-transform: uppercase;
  color: ${PRIMARY};
  font-size: 0.75rem;
  font-weight: bold;
  z-index: 1;
`;

const GoalContainer = styled.span`
  grid-area: goal;
  text-align: center;
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const Plus = styled.span`
  color: ${PRIMARY_DISABLED};
  &:hover {
    color: ${SECONDARY};
    
  }
`;


const Strain = styled.span`
  font-family: serif;
  font-weight: bold;
  font-size: 0.75rem;
`;

const ButtonsContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: ${({center}) => center ? "center" : "space-between"};
  position: absolute;
  align-items: center;
  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
  }
`;

const Day = ({date, month, goal}) => {
  date.setHours(0,0,0,0);
  const logs = useSelector((state) => state.training.logs);
  // month if for change the month, goal is to display inside the day what was done.
  const monthsArray = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  const today = new Date();
  today.setHours(0,0,0,0);
  let isToday = false;
  // check if date is today (so it can change the colour)
  if (date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) isToday = true;
  const movements = (logs.filter(log =>
      (new Date(log.date)).getDate() === date.getDate()
      && (new Date(log.date)).getMonth() === date.getMonth()
      && (new Date(log.date)).getFullYear() === date.getFullYear()
    ));

  // add a log
  const dispatch = useDispatch();
  const drafts  = useSelector((state) => state.log.drafts);
  const goals = useSelector((state) => state.training.goals);
  const handleAddLog = () => {
    // check if in draft exist a draft of the movement in this day
    const draftsThisDay = drafts.filter(draft => ((new Date(draft.date)).toDateString() === date.toDateString()) && (draft.movement === goal));
    if (draftsThisDay.length > 0) {
      // send the index
      const index = drafts.findIndex(draft => (draft.movement === goal));
      dispatch(setDraftActive(index));
    } else {
      dispatch(addDraft({date: date, movement: goal, active: true}));
    }
    dispatch(setActive());

  };

  return (
        <Container today={isToday} >
          <MonthContainer>
            {month && monthsArray[date.getMonth()]}
          </MonthContainer>
          <DayContainer>
            {date.getDate()}
          </DayContainer>
          <ButtonsContainer center={(movements.length === 0)}>
            <Plus><AddCircleOutlineRoundedIcon fontSize="large" onClick={()=>{handleAddLog();}}  /></Plus>
            {(movements.length === 0 ? "" : <Plus><PageviewIcon fontSize="large"/></Plus>)}
          </ButtonsContainer>
          <GoalContainer >

            {
              (goal === "" && (movements.length === 0 ? ""
                  : [...new Set(movements.map(movement => movement.movement))].map((mov, index) => (<Strain key={index}>{mov}</Strain>))
              ))
              ||
              (movements.filter(movement => movement.movement === goal).length === 0 ? ""
                : (movements.filter(movement => movement.movement === goal)).map((mov, ind) => (<Strain key={ind}>{mov.strain}{mov.unit}</Strain>)))
            }
          </GoalContainer>
        </Container>
    );
};

export default Day;
