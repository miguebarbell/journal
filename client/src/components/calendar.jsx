import styled from "styled-components";

import Day from "./day";

const Container = styled.div`
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

const Calendar = () => {
  const headerDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  const dateRange = (day, weeks) => {
    // day:date the in the center of ther array
    // weeks:number how many weeks before and after (from monday to sun)
    // return an array of dates%7
    let calendar = [];
    const firstMon = new Date();
    firstMon.setDate(day.getDate() - day.getDay() + 1 - (weeks * 7));
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
  const weeks = dateRange(today, 4);
    return (
        <Container>
            {headerDays.map((day, index) => (
              <LabelContainer key={index}>{day}</LabelContainer>
            ))}
          {weeks.map((day, index) => (
            <Day key={index} date={day.date} month={day.month}/>
          ))}
        </Container>
    );
};

export default Calendar;
