import styled from "styled-components";
import {threeColour} from "../conf";
import {useSelector} from "react-redux";
import {useState} from "react";

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
  span {
    font-size: 1rem;
  }
`;


const Day = ({date, month, goal}) => {
  const [strain, setStrain] = useState("+");
  const logs = useSelector((state) => state.training.logs);
  // console.log(logs);
  // console.log(date);
  // month if for change the month, goal is to display inside the day what was done.
  const monthsArray = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  const today = new Date();
  let isToday = false;
  // check if date is today (so it can change the colour)
  if (date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) isToday = true;
  let movements;
  if (goal === "") {
    movements = (logs.filter(log =>
      (new Date(log.date)).getDate() === date.getDate()
      && (new Date(log.date)).getMonth() === date.getMonth()
      && (new Date(log.date)).getFullYear() === date.getFullYear()
    ));
    // console.log(logs.map(log => (new Date(log.date)).getDate()));
    // console.log(date.getDate());
    // console.log(movements);
  }
  return (
        <Container today={isToday}>
          <MonthContainer>
            {month && monthsArray[date.getMonth()]}
          </MonthContainer>
          <DayContainer>
            {date.getDate()}
          </DayContainer>
          <GoalContainer>
            {movements.length === 0 ? "+" : movements.map(movement => (<span>{movement.movement}</span>))}
          </GoalContainer>
        </Container>
    );
};

export default Day;
