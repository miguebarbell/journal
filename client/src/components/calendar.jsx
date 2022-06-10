// external
import styled from "styled-components";
import {useState} from "react";
import {useSelector} from "react-redux";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// internal
import Day from "./day";
// conf
import {COLOR_FOUR, COLOR_ONE, COLOR_TWO, NAVBAR_HEIGHT, PRIMARY, PRIMARY_DISABLED, SECONDARY} from "../conf";
import DayDetails from "./daydetails";

const Container = styled.div`
  overflow-x: hidden;
  background-color: ${COLOR_TWO};
  color: ${COLOR_FOUR};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: calc(100vh - ${NAVBAR_HEIGHT});
`;
const GridContainer = styled.div`
  padding: 1rem;
  display: grid;
  grid-template-areas: "day day day day day day day";
  gap: 3px;
  justify-items: center;
  justify-content: center;
  div {
    height: 4rem;
    border-radius: 3px;
    padding: 0.25rem;
    width: 2rem;
    @media only screen and (min-device-width: 350px) {
      width: 2.25rem;
    }
    @media only screen and (min-device-width: 375px){
      width: 2.5rem;
    }
    @media only screen and (min-device-width: 440px){
      width: 3rem;
    }
    @media only screen and (min-device-width: 640px){
      width: 4rem;
    }

    @media only screen
    and (min-device-width : 860px) {
      width: 6rem;
    }

  }
`;
const GoalsWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;
const LabelContainer = styled.div`
  text-transform: uppercase;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  
`;
const GoalSpan = styled.span`
  cursor: pointer;
  text-decoration-thickness: 7px;
  text-decoration: ${({goal}) => goal ? "underline" + PRIMARY : "none" } ;
  background-color: ${({goal}) => goal ? "inherit" : PRIMARY_DISABLED};
  border: 1px solid ${PRIMARY_DISABLED};
  border-radius: 10px 10px 0 0;
  text-transform: capitalize;
  padding: 0.25rem 0.5rem 0 0.5rem;
  &:hover {
    background-color: ${COLOR_ONE};
    color: ${SECONDARY};
  }
  `;
const ChangeMonthSpan = styled.span`
  cursor: ${({disabled}) => disabled ? "default" : "pointer"};
  @media only screen
  and (max-device-width : 500px) {
    display: none;
  }
  border: 1px solid transparent;
  &:hover {
    //color: ${PRIMARY};
    color: ${SECONDARY};
  }
`;
const CalendarWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 1px solid ${PRIMARY_DISABLED};
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
    // pass if change the month
    let month = true;
    for (let i = 0; i < weeks*7 + 7; i++) {
      const dayToPush = new Date();
      dayToPush.setFullYear(firstMon.getFullYear());
      // why twice? this is a buggy
      dayToPush.setMonth(firstMon.getMonth());
      dayToPush.setMonth(firstMon.getMonth());
      dayToPush.setDate(firstMon.getDate() + i);
      // check if change the month in this day dayToPush.getDay === 0 ? month = true;
      if (calendar.length > 0 && dayToPush.getMonth() !== calendar[calendar.length - 1].date.getMonth()) month = true;
      calendar.push({
        date: dayToPush,
        month: month
      });
      if (month) month = false;
      // this makes stop the calendar at today
      if (dayToPush.getDate() === day.getDate() && dayToPush.getMonth() === day.getMonth() && dayToPush.getFullYear() === day.getFullYear()) break;
    }
    return calendar;
  };
  const today = new Date();
  let weeks = dateRange(today, 4);
  let swap = []
  const handleTouchMove = (e) => {
    // detect left or right
      if (e._reactName === "onTouchEnd") {
        if (swap.length > 2 && Math.abs(swap[0].x - swap[swap.length - 1].x) > 50) {
        if (swap[0].x - swap[swap.length - 1].x < 0) {
          setRelativeMonth(relativeMonth - 1)
        } else {
          if (relativeMonth < 0) setRelativeMonth(relativeMonth + 1)
        }
    }
      swap = []
    }
    if (e._reactName === "onTouchMove") {
      swap.push({x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY})
    }
  }
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
        <GridContainer
          onTouchMove={(e)=> handleTouchMove(e)}
          onTouchEnd={(e) => handleTouchMove(e)}
        >
            {headerDays.map((day, index) => (
              <LabelContainer key={index}>{day}</LabelContainer>
            ))}
          {weeks.map((day, index) => (
            <Day key={index} date={day.date} month={day.month} goal={goal}/>
          ))}
        </GridContainer>
        {relativeMonth !== 0 && <ChangeMonthSpan left={false} onClick={() => setRelativeMonth(relativeMonth + 1)}><ArrowForwardIosIcon/></ChangeMonthSpan>}
          {relativeMonth === 0 && <ChangeMonthSpan disabled={true}><ArrowForwardIosIcon color="disabled"/></ChangeMonthSpan>}
        </CalendarWrapper>
        <DayDetails goal={goal}/>
      </Container>
    );
};

export default Calendar;
