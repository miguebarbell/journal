import styled from "styled-components";
import {threeColour} from "../conf";
import {useSelector} from "react-redux";
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

const Container = styled.div`
  background-color: ${({today}) => today ? threeColour + "50" : "inherit"};
  border: 1px solid gray;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 1fr 2fr 1fr;
  grid-template-areas: "month center1 day" "goal goal goal" "check center2 behind";
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
    
  }
`;

const DayContainer = styled.span`
  grid-area: day;
  text-align: end;
  color: green;
  font-weight: bold;
  font-size: 0.75rem;
`;

const MonthContainer = styled.span`
  grid-area: month;
  text-transform: uppercase;
  color: red;
  font-size: 0.75rem;
  font-weight: bold;
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
  color: gray;
  &:hover {
    color: green;
  }
`;


const Strain = styled.span`
  font-family: serif;
  font-weight: bold;
  font-size: 0.75rem;
`;


const Day = ({date, month, goal}) => {
  const logs = useSelector((state) => state.training.logs);
  // console.log(logs);
  // console.log(date);
  // month if for change the month, goal is to display inside the day what was done.
  const monthsArray = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  const today = new Date();
  let isToday = false;
  // check if date is today (so it can change the colour)
  if (date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) isToday = true;
  const movements = (logs.filter(log =>
      (new Date(log.date)).getDate() === date.getDate()
      && (new Date(log.date)).getMonth() === date.getMonth()
      && (new Date(log.date)).getFullYear() === date.getFullYear()
    ));
    // console.log(logs.map(log => (new Date(log.date)).getDate()));
    // console.log(date.getDate());
    // console.log(movements);
  // console.log(movements.filter(movement => movement.movement === goal));
  return (
        <Container today={isToday}>
          <MonthContainer>
            {month && monthsArray[date.getMonth()]}
          </MonthContainer>
          <DayContainer>
            {date.getDate()}
          </DayContainer>
          <GoalContainer>
            {
              (goal === "" && (movements.length === 0 ? <Plus><AddCircleOutlineRoundedIcon fontSize="large"/></Plus> : movements.map((movement, index )=> (<Strain key={index}>{movement.movement}</Strain>))))
              || (movements.filter(movement => movement.movement === goal).length === 0 ? <Plus><AddCircleOutlineRoundedIcon fontSize="large"/></Plus> : (movements.filter(movement => movement.movement === goal)).map((mov, ind) => (<Strain key={ind}>{mov.strain}{mov.unit}</Strain>)))
            }
          </GoalContainer>
        </Container>
    );
};

export default Day;
