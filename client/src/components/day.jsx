import styled from "styled-components";
import {threeColour} from "../conf";

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
`;


const Day = ({date, month}) => {
  const monthsArray = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  const today = new Date();
  let isToday = false;
  // check if date is today (so it can change the colour)
  if (date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) isToday = true;

  return (
        <Container today={isToday}>
          <MonthContainer>
            {month && monthsArray[date.getMonth()]}
          </MonthContainer>
          <DayContainer>
            {date.getDate()}
          </DayContainer>
          <GoalContainer>
            +
          </GoalContainer>
        </Container>
    );
};

export default Day;
