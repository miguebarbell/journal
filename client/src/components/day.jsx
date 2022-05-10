// external
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import PageviewIcon from '@mui/icons-material/Pageview';
import {checkDays, prettierDate} from "./helper";

// internal
import {addDraft, setActive, setActiveDay, setDraftActive} from "../redux/logRedux";
//conf
import {COLOR_THREE, PRIMARY, PRIMARY_DISABLED, SECONDARY} from "../conf";

const Container = styled.div`
  svg {
    display: none;
  }
  &:hover {
    &:before {
      content: "Not in Timeframe range";
      font-weight: bold;
      color: ${PRIMARY};
      font-size: 0.8rem;
      //height: 100%;
      //background-color: rgba(0,0,0,.5);
      text-align: center;
      display: ${({show})=> show ? "none" : "flex"};
      align-content: center;
      justify-content: center;
      position: absolute;
      transform: translate(0, 0.85rem);
      backdrop-filter: blur(7px);
      //z-index: 1;
    }
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
  border-color: ${({selected}) => selected ? SECONDARY : "none"};
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
  //z-index: 1;
`;

const MonthContainer = styled.span`
  grid-area: month;
  font-family: 'Cinzel', serif;
  text-transform: uppercase;
  color: ${PRIMARY};
  font-size: 0.75rem;
  font-weight: bold;
  //z-index: 1;
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
  display: ${({show}) => show ? "block" : "none"};
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
  justify-content: ${({spread}) => spread ? "space-between" : "center"};
  position: absolute;
  align-items: center;
  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
  }
`;

const Day = ({date, month, goal}) => {
  // get the timeline of the goal
  const goalObject = useSelector((state) => state.training.goals.filter((el) => el.movement === goal))[0]
  const isInTheTimeFrame = () => {
    if (goal !== "") {
      const firstDay = new Date(goalObject.start)
      const lastDay = new Date(goalObject.start)
      lastDay.setDate(lastDay.getDate() + goalObject.timeFrame)
      return (date <= lastDay && date >= firstDay)
    }
    return true
  }
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
  // const goals = useSelector((state) => state.training.goals);
  const selectedDay = useSelector((state) => state.log.day);

  const handleAddLog = () => {
    // todo don't allow add a log before the first day for the goal
    // check if in draft exist a draft of the movement in this day
    document.title =  `Journal App - adding ${goal} ${prettierDate(date.toDateString())}`;
    const draftsThisDay = drafts.filter(draft => ((new Date(draft.date)).toDateString() === date.toDateString()) && (draft.movement === goal));
    if (draftsThisDay.length > 0) {
      // send the index
      const index = drafts.findIndex(draft => (draft.movement === goal));
      dispatch(setDraftActive(index));
    } else {
      dispatch(addDraft({date: date.toDateString(), movement: goal, active: true}));
    }
    dispatch(setActive(goal));
  };
  const handleViewLog = () => {
    // change the store

    document.title =  `Journal App - ${prettierDate(date.toDateString())}`;
    dispatch(setActiveDay(date.toDateString()));
  };
  const goalThatDay = (movements.map(mov => mov.movement).filter(mo => mo === goal).length > 0);
  const movementThatDay = (movements.length > 0);



  return (
        <Container show={isInTheTimeFrame()} today={isToday} selected={checkDays(selectedDay, date.toDateString())}>
          <MonthContainer>
            {month && monthsArray[date.getMonth()]}
          </MonthContainer>
          <DayContainer>
            {date.getDate()}
          </DayContainer>
          <ButtonsContainer spread={goalThatDay || (movementThatDay && goal === "")}>
            <Plus show={isInTheTimeFrame()}><AddCircleOutlineRoundedIcon fontSize="large" onClick={()=>{handleAddLog();}}/></Plus>
            {(goalThatDay  // this check if the goal is in the day
              || (goal === "" && movementThatDay) ? // this check if the general view and you got logs on that day
              <Plus show={isInTheTimeFrame()}><PageviewIcon fontSize="large" onClick={()=>{handleViewLog();}}/></Plus> : null)}
          </ButtonsContainer>
          <GoalContainer>

            {
              (goal === "" && (!movementThatDay ? ""
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
