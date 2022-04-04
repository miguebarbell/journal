// external
import styled from "styled-components";
import {useSelector} from "react-redux";
//internal
import {checkDays} from "./helper";
//conf
import {COLOR_FOUR, COLOR_THREE} from "../conf";
import {checkDays} from "./helper";


const Container = styled.div`
  display: ${({show}) => show ? "flex" : "none"};
  color: ${COLOR_FOUR};
  min-height: 200px;
  flex-direction: column;
  border-bottom: 1px solid ${COLOR_FOUR};
  margin: 10px;
  //padding: 0 5rem;
  div {
    display: grid;
    grid-template-areas: "movement sets reps strain relint";
    grid-template-columns: 3fr 1fr 1fr 1fr 3fr;
    max-width: 100%;
    
    span#movement {
      color: ${COLOR_THREE};
      font-weight: bold;
      text-transform: capitalize;
    }
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: bold;
  border-bottom: 1px solid ${COLOR_THREE};
  margin-bottom: 1rem;
  padding: 0 3rem;
  * {
    text-transform: capitalize;
  }
`;

const DayDetails = ({goal}) => {
  const relativeIntensity = (reps, strain) => {
    // this returns the realtive intensity of the set
    if (reps === 1) {
      return strain;
    } else {
      return (reps * 0.03333 * strain) + strain;
    }
  };

    // const checkDays = (date1, date2) => {
    //   // check if two string dates are the same day return boolean
    //   const firstDate = new Date(date1);
    //   const secondDate = new Date(date2);
    //   return (
    //     firstDate.getDate() === secondDate.getDate()
    //   && firstDate.getMonth() === secondDate.getMonth()
    //   && firstDate.getFullYear() === secondDate.getFullYear()
    //   );
    // };
    const show = useSelector((state) => state.log.day);
    const logs = useSelector((state) => state.training.logs);

    return (
        <Container show={show}>
            <TitleWrapper>
              <div>{show ? show : ""}</div>
              <div>{goal !== "" ? goal : "General"}</div>
            </TitleWrapper>
            {logs.map((log, index) =>
              // this is the detail view for the specific goal
              (checkDays(log.date, show) &&
              log.movement === goal &&
              <div id="grid" >
              <span key={index} id="movement">{goal === "" ? log.movement + " " : ""}</span>
              <span>{log.sets !== 1 ? log.sets + " times " : ""}</span>
              <span> {log.reps !== 1 ? log.reps + " reps " : ""}</span>
              <span>{log.strain} {log.unit + "."}</span>
              {/*<span>{relativeIntensity(log.reps, log.strain)}</span>*/}
              </div>)
              // this is the detail in the general view
              || (goal === "" && checkDays(log.date, show) &&
                <div id="grid" >
                  <span key={index} id="movement">{goal === "" ? log.movement + " " : ""}</span>
                  <span>{log.sets !== 1 ? log.sets + " times " : ""}</span>
                  <span> {log.reps !== 1 ? log.reps + " reps " : ""}</span>
                  <span>{log.strain} {log.unit + "."}</span>
                  {/*<span>{relativeIntensity(log.reps, log.strain)}</span>*/}
                </div>)
            )}


        </Container>
    );
};

export default DayDetails;
