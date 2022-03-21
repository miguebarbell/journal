import styled from "styled-components";

import Day from "./day";
import {useState} from "react";
import {useSelector} from "react-redux";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const GridContainer = styled.div`
  //background-color: yellow;
  padding: 1rem;
  display: grid;
  //grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-areas: "day day day day day day day";
  gap: 3px;
  justify-items: center;
  justify-content: center;
  div {
    height: 4rem;
    width: 6rem;
    border-radius: 3px;
    padding: 0.25rem;
  }
`;

const GoalsWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  //width: 100%;
`;

const LabelContainer = styled.div`
  text-transform: uppercase;
  font-weight: bold;
  //text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  
  //grid-area: day;
  
`;

const GoalSpan = styled.span`
  cursor: pointer;
  text-decoration-thickness: 10%;
  text-decoration: ${({goal}) => goal ? "underline red" : "none" } ;
  text-transform: capitalize;
  margin: 2rem;
  `;

const ChangeMonthSpan = styled.span`
  cursor: pointer;
  //top: 50%;
  //position: absolute;
`;


const CalendarWrapper = styled.div`
  display: flex;
  align-items: center;
  //background-color: red;
  padding: 1rem;
  border: 1px solid black;
  border-radius: 10px;
`;

const Calendar = () => {
  const goals = useSelector((state) => state.training.goals);
  const [relativeMonth, setRelativeMonth] = useState(0);
  const [goal, setGoal] = useState("");
  const headerDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  const dateRange = (day, weeks) => {
    // weeks:number how many weeks before and after (from monday to sun)
    // return an array of dates%7
    let calendar = [];
    const firstMon = new Date();
    firstMon.setDate(day.getDate() - day.getDay() + 1 - (weeks * 7));
    // relativeMonth === 0 && firstMon.setDate(day.getDate() - day.getDay() + 1 - (weeks * 7));
    firstMon.setMonth(firstMon.getMonth() + relativeMonth);
    relativeMonth !== 0 && firstMon.setDate(firstMon.getDate() - firstMon.getDay() + 1);
    // console.log(firstMon);
    // console.log(firstMon.getDate());
    // console.log(firstMon.getDay());
    // console.log(firstMon.setDate(firstMon.getDate() - firstMon.getDay()));
    // pass if change the month
    let month = true;
    for (let i = 0; i < weeks*7 + 7; i++) {
      const dayToPush = new Date();
      dayToPush.setFullYear(firstMon.getFullYear());
      dayToPush.setMonth(firstMon.getMonth());
      dayToPush.setDate(firstMon.getDate() + i);
      // check if change the month in this day dayToPush.getDay === 0 ? month = true;
      if (calendar.length > 0 && dayToPush.getMonth() !== calendar[calendar.length - 1].date.getMonth()) month = true;
      calendar.push({
        date: dayToPush,
        month: month
      });
      if (month) month = false;
      if (dayToPush.getDate() === day.getDate() && dayToPush.getMonth() === day.getMonth() && dayToPush.getFullYear() === day.getFullYear()) break;
    }
    return calendar;
  };
  const today = new Date();

  let weeks = dateRange(today, 4);

    return (
      <Container>
        <GoalsWrapper>
          <GoalSpan onClick={() => setGoal("")} goal={(goal === "")}>General</GoalSpan>
        {goals.map((tabGoal, index) => (
          <GoalSpan key={index} onClick={() => setGoal(tabGoal.movement)} goal={goal === tabGoal.movement}>{tabGoal.movement}</GoalSpan>

        ))}
        </GoalsWrapper>
        <CalendarWrapper>
        <ChangeMonthSpan left={true} onClick={() => setRelativeMonth(relativeMonth - 1)}><ArrowBackIosIcon/></ChangeMonthSpan>
        <GridContainer>
            {headerDays.map((day, index) => (
              <LabelContainer key={index}>{day}</LabelContainer>
            ))}
          {weeks.map((day, index) => (
            <Day key={index} date={day.date} month={day.month} goal={goal}/>
          ))}
        </GridContainer>
        {relativeMonth !== 0 && <ChangeMonthSpan left={false} onClick={() => setRelativeMonth(relativeMonth + 1)}><ArrowForwardIosIcon/></ChangeMonthSpan>}
        </CalendarWrapper>
      </Container>
    );
};

export default Calendar;
