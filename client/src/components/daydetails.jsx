// external
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {useState} from "react";
//internal
import {checkDays, epleyFormula, brzyckiFormula, accumulatedDistanceFormula} from "./helper";
import {DISTANCE_ACCUMULATED, RELATIVE_INTENSITY, REPS, SETS, STRAIN} from "./definitions";
import {editLog} from "../redux/goalRedux";
//conf
import {COLOR_FOUR, COLOR_THREE, COLOR_TWO, PRIMARY, SECONDARY} from "../conf";


const Container = styled.div`
  display: ${({show}) => show ? "flex" : "none"};
  color: ${COLOR_FOUR};
  min-height: 200px;
  flex-direction: column;
  border-bottom: 1px solid ${COLOR_FOUR};
  margin: 10px;
  max-width: calc((6rem * 7) + (3px * 12)); // this is the width of the calendar

  div {
    display: grid;
    grid-template-areas: "sets reps strain relint";
    grid-template-columns: 1fr 1fr 1fr 1fr;
    max-width: 100%;
	  cursor: pointer;
	  padding: 0.05rem 0;
	  border: 1px solid transparent;
	  border-radius: 5px;
	  &#grid {
			  margin: 0.1rem 0.1rem;
		  	padding: 0.15rem 0.25rem;
		  
			  svg {
				  position: absolute;
				  display: none;
				  color: ${SECONDARY};
				  transform: translate(-150%, 0);
			  
		  }
		  &:hover {
		  	background-color: ${PRIMARY+"50"};
			  border-color: ${SECONDARY};
			  //color: ${COLOR_TWO};
			  svg {
				  display: inherit;
			  }
	  }
	  }

    span:hover:after {
      color: ${COLOR_TWO};
      position: absolute;
      background: white;
      max-width: 6rem;
      font-size: 0.85rem;
      display: block;
      border: 1px solid ${COLOR_THREE};
      border-radius: 10px;
      padding: 0.5rem;
      transform: translate(-25%, calc(-100% - 1.5rem));
    }

    span#strain:hover:after {
      content: ${STRAIN};
    }

    span#reps:hover:after {
      content: ${REPS};
    }

    span#sets:hover:after {
      content: ${SETS};
    }

    span#relint:hover:after {
      content: ${RELATIVE_INTENSITY};
    }

    span#accdist:hover:after {
      content: ${DISTANCE_ACCUMULATED};
    }

    span#movement {
      color: ${COLOR_THREE};
      font-weight: bold;
      text-transform: capitalize;
    }
  }
`;
const TitleWrapper = styled.div`
  font-weight: bold;
  border-bottom: 1px solid ${COLOR_THREE};
  margin-bottom: 1rem;
  padding: 0 3rem;
	display: flex;
	align-items: flex-end;
  * {
    text-transform: capitalize;
  }

  div#day {
	  font-size: 0.75rem;
	  grid: "sets reps";
  }

  div#goal {
	  color: ${COLOR_THREE};
	  grid: "strain relint";
  }
`;

const DayDetails = ({goal}) => {
	const show = useSelector((state) => state.log.day);
	const logs = useSelector((state) => state.training.logs);
	const goals = useSelector((state) => state.training.goals);
	const dispatch = useDispatch();
	const typeOfStrain = goals.filter(el => el.movement === goal);
	return (
		<Container show={show}>
			<TitleWrapper>
				<div id="day">{show ? show: " "}</div>
				<div id="goal">{goal !== "" ? goal : " Day Overview"}</div>
			</TitleWrapper>
			<div id="header">
				{goal === "" ? <span></span> : null}
				{/*<span></span>*/}
				<span id="sets">sets</span>
				<span id="reps">reps</span>
				<span id="strain">strain</span>
				{goal === "" ? null : ["kgs", "lbs"].includes(typeOfStrain[0].unit) ? <span id="relint">Rel Int</span> : <span id="accdist">Accum</span>}
			</div>
			{logs.map((log, index) =>
				// this is the detail view for the specific goal
				(checkDays(log.date, show) &&
					log.movement === goal &&
					<div key={index} id="grid" onClick={() => {dispatch(editLog(log));}}>
						<RemoveRedEyeIcon/>
						{goal === "" ? <span id="movement">{log.movement}</span> : null}
						{/*<span id="movement">{goal === "" ? log.movement + " " : ""}</span>*/}
						<span>{log.sets !== 1 ? log.sets + " times " : ""}</span>
						<span> {log.reps !== 1 ? log.reps + " reps " : ""}</span>
						<span>{log.strain} {log.unit + "."}</span>
						{["kgs", "lbs"].includes(log.unit) ?
							<span> ~{log.reps < 5 ? epleyFormula(log.strain, log.reps) : brzyckiFormula(log.strain, log.reps)} {log.unit + "."}</span>
							: ""
						}
						{
							["mts", "kms", "mi", "ft"].includes(log.unit) ?
								<span>{accumulatedDistanceFormula(log.strain, log.sets, log.reps)}</span>
								: ""
						}
					</div>)
				// this is the detail in the general view
				|| (goal === "" && checkDays(log.date, show) &&
					<div key={index} id="grid" onClick={() => {dispatch(editLog(log));}}>
						<RemoveRedEyeIcon/>
						<span id="movement">{goal === "" ? log.movement + " " : ""}</span>
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
