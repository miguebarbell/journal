import styled from "styled-components";

import Day from "./day";

const Container = styled.div`
  background-color: yellow;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 3px;

  div {
    height: 3rem;
    width: 4rem;
  }
`;

const LabelContainer = styled.div`
  text-transform: uppercase;
  //text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
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
    for (let i = 0; i < weeks*7*2 + 7; i++) {
      const dayToPush = new Date();
      dayToPush.setFullYear(firstMon.getFullYear());
      dayToPush.setMonth(firstMon.getMonth());
      dayToPush.setDate(firstMon.getDate() + i);
      calendar.push(dayToPush);
    }
    return calendar;
  };
  const today = new Date();
  const weeks = dateRange(today, 1);
    return (
        <Container>
            {headerDays.map((day, index) => (
              <LabelContainer key={index}>{day}</LabelContainer>
            ))}
          {weeks.map((day, index) => (
            <Day key={index} date={day}/>
          ))}
        </Container>
    );
};

export default Calendar;
