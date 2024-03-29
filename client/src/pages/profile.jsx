// external
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloseIcon from '@mui/icons-material/Close';
// internal
import AddGoal from "../components/addgoal";
import {logOut} from "../redux/userRedux";
// conf and variables
import {COLOR_FOUR, NAVBAR_HEIGHT, COLOR_THREE, COLOR_TWO, PRIMARY, SECONDARY} from "../conf";
import {profileBanner} from "../components/quotes";
import GoalChart from "../components/goalChart";
import {BlurContainer, DataWrap, FormContainer, HeaderWrapper} from "../components/addLog";
import {prettierDate} from "../components/helper";
import {deleteThisGoal, editThisGoal} from "../redux/goalApiCalls";

const Author = styled.span`
  font-size: 0.75rem;
  font-weight: bold;
  //font-family: 'Cinzel', serif;
  font-family: 'Comfortaa', cursive;
  letter-spacing: 0.1rem;
`;
const Container = styled.div`
  color: ${COLOR_FOUR};
  background-color: ${COLOR_TWO};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: calc(100vh - ${NAVBAR_HEIGHT});
  padding: 1rem 0 2rem 0;

  div#edit-container {
    color: black;
  }
`;
const EditButton = styled.button`
  border: 1px solid black;
  border-radius: 5px;
  cursor: pointer;
  padding: 0.5rem;
  margin: 0 5px;
  font-weight: bold;
  background-color: ${PRIMARY};
  color: ${COLOR_FOUR};
  &:hover {
    background-color: ${SECONDARY};
    color: ${COLOR_TWO};
	  &:before {
		  content: ${({ads}) => ads ? ads : 'no'};
		  position: absolute;
		  transform: translate(-2.8rem, -120%);
		  border-radius: 5px;
		  padding: 0.5rem;
		  background-color: white;
	  }
  }
`;
const Title = styled.h1`
  font-family: 'Permanent Marker', cursive;
`;
const LogoutButton = styled.button`
  border: 1px solid black;
  border-radius: 5px;
  cursor: pointer;
  padding: 0.5rem;
  margin: 0 5px;
  background-color: red;
  font-weight: bold;
  color: ${COLOR_FOUR};

  &:hover {
    background-color: ${SECONDARY};
    color: ${COLOR_TWO};
  }
`;
const InfoWrapper = styled.div`
  //max-height: 50vh;
	display: compact;
	
	@media screen and (min-width: 600px) {
		display: flex;
	}
  //display: flex;
  //align-items: center;
  border-bottom: 1px groove ${COLOR_FOUR};
  * {
    margin: 1rem;
  }
	div.info {
		flex: 2;
	}
`;
const ProfilePicture = styled.div`
	border-radius: 50%;
	height: 15vh;
	width: 15vh;
	max-width: 15vh;
	max-height: 15vh;
	background-image: linear-gradient(27deg, ${PRIMARY}, ${SECONDARY});
	cursor: pointer;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: inset 0 0 6px 3px ${COLOR_TWO};
	flex: 1;
	img {
		position: absolute;
    height: 15vh;
    width: 15vh;
    border-radius: 50%;
	}
	div {
    display: flex;
		position: absolute;
		//width: 100%;
		//height: 100%;
		border-radius: 50%;
		justify-content: center;
		align-items: center;
		font-size: 2rem;
		font-weight: bold;
		background-color: rgb(0,0,0);
		opacity: 0;
    transition: opacity 0.2s ease-in-out;    
		height: 15vh;
    width: 15vh;
	}
	 &:hover {
		 div {
			 opacity: 0.8;
		 }
   }
	* {
		position: absolute;
	}
`;
const MotivationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;
const Quote = styled.span`
  font-style: italic;
  font-size: 1.5rem;
  font-family: 'Just Another Hand', cursive;
  letter-spacing: 0.15rem;
  padding: 0;
  margin: 0;
`;
const GoalsContainer = styled.div`
  padding: 1rem;
`;
const GoalCard = styled.div`
  box-shadow: 0 0 5px ${COLOR_FOUR};
  background-color: ${COLOR_THREE};
  margin: 1rem;
  padding: 1rem;
  border-radius: 10px;

  div#strain {
    display: flex;
    justify-content: space-between;
    align-items: center;

    color: ${COLOR_TWO};

    &:nth-child(2) {
      font-family: 'Share Tech Mono', monospace;
      text-align: end;
    }

    div {

      span:nth-child(1) {
        font-weight: bold;
        font-size: 1.5rem;
      }

      span:nth-child(2),
      span:nth-child(1) {
        font-family: 'Permanent Marker', cursive;
      }

    }
  }

  div#movement {
    font-weight: bold;
    font-size: 2rem;
    display: flex;
    justify-content: space-between;

    span:nth-child(2) {
      font-family: 'Rock Salt', cursive;
      text-transform: capitalize;
      margin: 0 1rem;
      padding: 0 0.25rem;
      cursor: pointer;
      //border: 2px solid transparent;
      border-radius: 5px;

      &:after {
        display: none;
        content: "display it.";
        position: absolute;
        transform: translate(0, 1.5rem);
        padding: 0.25rem 0.5rem;
        font-size: 0.85rem;
        font-family: 'Comfortaa', cursive;
        //border: 2px solid transparent;
        border-radius: 0 5px 5px 0;
        border-left: 0;
        z-index: 1;
        color: ${COLOR_TWO};
      }

      &:hover {
        //border-color: blue;
          //background-image: linear-gradient(${SECONDARY + "90"}, ${PRIMARY + "85"});
        &:after {
          display: inline-block;
            //background-image: linear-gradient(${PRIMARY}, ${SECONDARY});
          //border-color: blue;
        }
      }
    }

    span:nth-child(4) {
      font-family: 'Share Tech Mono', monospace;
      color: ${COLOR_TWO};
    }

    span#left {
      font-size: 1rem;
      font-weight: lighter;
    }

    svg {
      display: none;
      position: absolute;
      transform: translate(5rem, -0.5rem);
      color: red;
      cursor: pointer;

      &:after {
        content: "edit";
        position: absolute;
      }
    }

    &:hover svg {
      display: block;
    }
  }
`;
const EditGoalContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  text-align: center;

  &:first-child {
  }

  div.container {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    padding: 0 0.5rem;
    border: 2px solid ${COLOR_THREE};
    background-color: ${COLOR_THREE};
    margin-bottom: 1rem;
    border-radius: 5px;

    div {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
	    flex-wrap: wrap;
      width: 100%;
      padding-bottom: 0.5rem;
    }

  }
`;
const Input = styled.input`
  cursor: pointer;
  border: none;
  width: ${({rems}) => rems ? rems.split("").length + 'rem' : 'inherit'};
  font-family: 'Cantarell', sans-serif;
  font-weight: bold;
  font-size: 1rem;
  text-align: center;
  text-transform: capitalize;
  background-color: ${COLOR_THREE};

  &:before {
    font-weight: normal;
    //background-color: white;
    content: "Edit";
    //position: absolute;
    transform: translate(0, -2rem);
    display: none;
    padding: 0.15rem 0.25rem;
    border: 1px solid ${COLOR_THREE};
    border-radius: 5px;
  }

  &:hover {
    color: ${COLOR_TWO};
    text-decoration: underline;

    &:before {
      display: inline-block;
    }
  }
}
`;
const TextArea = styled.textarea`
  width: ${({rems}) => rems ? rems.split("").length + 'em' : 'inherit'};
  max-height: 3rem;
  border: none;
  cursor: pointer;
  font-family: 'Cantarell', sans-serif;
  font-weight: bold;
  background-color: ${COLOR_THREE};

  &:hover {
    color: ${COLOR_TWO};
    text-decoration: underline;
`;
const Button = styled.button`
  text-transform: capitalize;
  color: white;
  font-weight: bold;
  cursor: pointer;
  padding: 0.15rem 0.5rem;
  border-radius: 5px;
  display: ${({show}) => show !== false ? 'inline-block' : 'none'};

  &#save {
    border: 2px solid green;
    background-color: green;

    &:hover {
      background-color: white;
      color: green;
    }
  }

  &#cancel {
    border: 2px solid orange;
    background-color: orange;

    &:hover {
      background-color: white;
      color: orange;
    }
  }

  &#delete {
    border: 2px solid red;
    background-color: red;

    &:hover {
      background-color: white;
      color: red;
    }
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Plan = styled.select`
  border: none;
  background: none;
  cursor: pointer;
  font-family: 'Cantarell', sans-serif;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }

  option {
    background: none;
  }
`;
const Review = styled.div`
	display: flex;
	flex-direction: column;
	font-family: Cantarell, sans-serif;
	color: ${COLOR_TWO};
	background-color: ${COLOR_FOUR};
	padding: 0 2rem 1rem 2rem;
	margin: 1rem;
	border-radius: 5px;
	h2, h3 {
		padding: 0;
		margin: 1rem 0;
	}
`;
const TimeReviewInput = styled.input`
	width: ${({value}) => value === 0 ? '10rem' : '4rem'};
	position: ${({value}) => value === 0 ? 'absolute' : 'relative'};
	transform: translateX(${({value}) => value === 0 ? '-3rem' : '0'});
	border: none;
	background-color: transparent;
	font-size: 1.7rem;
	align-items: center;
	text-align: center;
	font-family: inherit;
	font-weight: bold;
	color: ${({value}) => value === 0 ? 'transparent' : 'inherit'};

`;

const Profile = () => {
	const handleTimeReview = (e) => {
		// only zero or positive numbers
		if (e.target.value < 0 || isNaN(e.target.value)) setTimeReview('')
		else setTimeReview(+e.target.value)
	}
	const motivationQuote = profileBanner[Math.floor(Math.random() * profileBanner.length)];
	const dispatch = useDispatch();
	const handleLogout = () => {
		dispatch(logOut());
	};
	const [displayingGoal, setDisplayingGoal] = useState(false);
	const [displayingGraph, setDisplayingGraph] = useState(false);
	const [goalEdit, setGoalEdit] = useState(false);
	const [goalPlan, setGoalPlan] = useState(goalEdit.plan ? goalEdit.plan : '0');
	const [goalQuantity, setGoalQuantity] = useState(goalEdit.quantity ? goalEdit.quantity : '0');
	const [goalUnit, setGoalUnit] = useState(goalEdit.unit ? goalEdit.unit : '0');
	const [goalTimeFrame, setGoalTimeFrame] = useState(goalEdit.timeFrame ? goalEdit.timeFrame : '0');
	const [goalStartTime, setGoalStartTime] = useState(goalEdit.start ? goalEdit.start : '0');
	const [goalNotes, setGoalNotes] = useState(goalEdit.notes ? goalEdit.notes : '0');
	const [editedGoal, setGoalEdited] = useState(false)
	const [timeReview, setTimeReview] = useState(30)
	const [adMessage, setAdMessage] = useState('')

	const resetGoal = (goal) => {
		setGoalPlan(goal.plan)
		setGoalQuantity(goal.quantity)
		setGoalUnit(goal.unit)
		setGoalTimeFrame(goal.timeFrame)
		setGoalStartTime(goal.start)
		setGoalNotes(goal.notes)

	}
	const addGoal = () => {
		setDisplayingGoal(true);
		document.title = "Adding goal.";
	};
	const handleEditGoal = (goal) => {
		document.title = `Editting ${goal.movement}.`;
		setGoalEdit(goal)
		resetGoal(goal)
	};
	const handleCancel = () => {
		document.title = `Journal App - Goals.`;
		setGoalEdit(false)
	};
	const handleDelete = () => {
		deleteThisGoal(dispatch, goalEdit)
		handleCancel()
	}
	const user = useSelector((state) => state.user.currentUser);
	const goals = useSelector((state) => state.training.goals);
	const logs = useSelector((state) => state.training.logs);
	const timeFrame = (startDay, daysToComplete) => {
		// const stringDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		// const stringMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		const beginDay = new Date(startDay);
		const finishDay = new Date(startDay);
		finishDay.setDate(beginDay.getDate() + daysToComplete);
		const daysLeftToComplete = Math.round((finishDay - new Date()) / (1000 * 60 * 60 * 24));
		const weeks = Math.floor(daysLeftToComplete / 7);
		const rest = daysLeftToComplete % 7;
		return {
			left: daysLeftToComplete,
			weeks: weeks,
			rest: rest
		};
	};
	const accumulative = (goal, days) => {
		// accept goal string and return a number
		let logsForGoal;
		if (days === 0) logsForGoal = logs.filter(log => log.movement === goal);
		else logsForGoal = logs.filter(log => (log.movement === goal) && (new Date(log.date) >= (new Date()).setDate(new Date().getDate() - days)));
		const response = {
			goal,
			strain: 0,
			sets: 0,
			reps: 0,
			duration: 0,
			avgStrainPerSet: 0,
			strainVol: 0,
		};
		logsForGoal.forEach(log => {
			response.strainVol += log.strain * log.reps * log.sets
			response.strain += log.strain
			response.sets += log.sets
			response.reps += log.reps
			response.duration += log.duration
			response.unit = log.unit
		})
		response.avgStrainPerSet = isNaN(response.strain / response.sets) ? 0 : Math.round(response.strain / response.sets);
		return response;
	};
	const [accumulatedGoals, setAccumulatedGoals] = useState(goals ? goals.map(goal => accumulative(goal.movement, timeReview)) : [])
	const trimValue = (value) => {
		if (value === String("")) return ' ';
		else if (value < 1) return 1;
		return value
	}
	const handleSave = () => {
		const editedGoal = {
			movement: goalEdit.movement,
			user: user.email,
			quantity: goalQuantity ? goalQuantity : goalEdit.quantity,
			unit: goalUnit ? goalUnit : goalEdit.unit,
			timeFrame: goalTimeFrame ? goalTimeFrame : goalEdit.timeFrame,
			start: goalStartTime ? goalStartTime : goalEdit.start,
			plan: goalPlan ? goalPlan : goalEdit.plan,
			notes: goalNotes ? goalNotes : goalEdit.notes,
		}
		editThisGoal(dispatch, editedGoal)
		handleCancel()
		document.title = `Journal App - Goals.`;
	}
	useEffect(() => {
		if (goals.length > 2) {
			setAdMessage('You should focus in one goal at a time.')
		} else setAdMessage('Maintain a low goals length.')
		setAccumulatedGoals(goals.map(goal => accumulative(goal.movement, timeReview)))
	}, [goals, timeReview])
	const tacticTime = (timeInMin) => {
		if (!timeInMin) return `nothing`
		if (timeInMin > 60) {
			if (timeInMin%60 === 0) {
				return `${timeInMin/60} hours`
			}
			return `${Math.floor(timeInMin/60)}:${timeInMin%60}`
		}
		return `${timeInMin} mins`
	}
	const tacticVolume = (volume, unit) => {
		if (!volume) return `nothing`
		switch (unit) {
			case 'kgs':
				if (volume > 1000) {
					if (volume%1000 === 0) {
						return `${volume/1000} tons`
					}
					return `${(volume/1000).toFixed(2)} tons`
				}
				return `${volume} ${unit}`
			case 'mts':
				if (volume > 1000) {
					if (volume%1000 === 0) {
						return `${volume/1000} kms`
					}
					return `${(volume/1000).toFixed(2)} kms`
				}
				return `${volume} ${unit}`
			case 'fts':
				if (volume > 5280) {
					if (volume%5280 === 0) {
						return `${volume/5280} miles`
					}
					return `${(volume/5280).toFixed(2)} miles`
				}
				return `${volume} ${unit}`
			case 'lbs':
				if (volume > 2204.6226) {
					if (volume%2204.6226 === 0) {
						return `${volume/2204.6226} tons`
					}
					return `${(volume/2204.6226).toFixed(2)} tons`
				}
				return `${volume} ${unit}`
			case 'min':
				const days = volume/1440
				const hours = (days - Math.floor(days))*24
				const minutes = (hours - Math.floor(hours))*60
				if (volume > 60) {
					if (volume > 1440) {
						// days:hours:minutes
						return `${Math.floor(days)} days ${Math.floor(hours)}${Math.floor(minutes) === 0 ? " hours" : `:${Math.floor(minutes)}`}`
					}
					// hours:minutes
					return `${Math.floor(hours)}${Math.floor(minutes) === 0 ? " hours" : `:${Math.floor(minutes)}`}`
				}
				// minutes
				return `${volume} minutes`
			default:
				return `${volume} ${unit}`
		}
	}
	const handleChangeProfilePicture = () => {
		// todo: update the profile picture
		alert('change it!!')
	}
	return (
		<Container>
			<BlurContainer show={goalEdit} id="edit-container">
				<FormContainer>
					<HeaderWrapper>
						<h2>{goalEdit.movement} goal</h2>
						<DataWrap id="close">
							<CloseIcon onClick={handleCancel}/>
						</DataWrap>
					</HeaderWrapper>
					<EditGoalContainer>
						<div className="container">
							<h3>Goal</h3>
							<div>
								<Plan
									value={goalPlan ? goalPlan : goalEdit.plan}
									rems={goalEdit.plan}
									onChange={(e) => {
										setGoalPlan(e.target.value)
										setGoalEdited(true)
									}}
								>
									<option value="test">Max Attempt</option>
									<option value="accu">Accumulate</option>
									<option value="habit">Every Day</option>
								</Plan>
								&nbsp;
								<span>
								{goalEdit.movement}
							</span>
								&nbsp;
								<Input
									value={goalQuantity ? goalQuantity : goalEdit.quantity}
									rems={goalQuantity ?
										`${goalQuantity}`.split("").length < `${goalEdit.quantity}++`.split("").length ? `${goalQuantity}++` : `${goalEdit.quantity}++`
										: `${goalEdit.quantity}++`}
									placeholder={goalEdit.quantity}
									type="number"
									onChange={(e) => {
										setGoalQuantity(trimValue(e.target.value))
										setGoalEdited(true)
									}}
								/>
								&nbsp;
								<Plan
									value={goalUnit ? goalUnit : goalEdit.unit}
									rems={goalEdit.unit}
									onChange={(e) => {
										setGoalUnit(e.target.value)
										setGoalEdited(true)
									}}
								>
									<option value="kgs">Kilos</option>
									<option value="lbs">Pounds</option>
									<option value="min">Minutes</option>
									<option value="mts">Meters</option>
									<option value="fts">Feet</option>
									<option value="hrs">Hours</option>
									{
										goalPlan === 'habit' || goalPlan === 'accu' ? <option value="times">Times</option> : null
									}
								</Plan>
							</div>
						</div>
						<div className="container">
							<h3>TIMEFRAME</h3>
							<div>
								<Input
									value={goalTimeFrame ? goalTimeFrame : goalEdit.timeFrame}
									rems={`${goalEdit.timeFrame}+`}
									placeholder={goalEdit.timeFrame}
									type="number"
									onChange={(e) => {
										setGoalTimeFrame(trimValue(e.target.value))
										setGoalEdited(true)
									}}
								/>
								<span>days from</span>
								<Input
									type="date"
									value={goalStartTime ? prettierDate(goalStartTime) : prettierDate(goalEdit.start)}
									rems={goalStartTime ? prettierDate(goalStartTime) : prettierDate(goalEdit.start)}
									placeholder={goalStartTime ? prettierDate(goalStartTime) : prettierDate(goalEdit.start)}
									onChange={(e) => {
										const date = new Date(`${e.target.value}T00:00:00`)
										const newDate = new Date()
										newDate.setMonth(date.getMonth())
										newDate.setDate(date.getDate())
										newDate.setFullYear(date.getFullYear())
										setGoalStartTime(newDate)
										setGoalEdited(true)
									}}
								/>
							</div>
							<div>
								<TextArea
									value={goalNotes ? goalNotes : goalEdit.notes}
									rems={goalEdit.notes}
									placeholder={goalEdit.notes}
									onChange={(e) => {
										setGoalNotes(e.target.value === "" ? new String("") : e.target.value)
										setGoalEdited(true)
									}}
								/>
							</div>
						</div>
					</EditGoalContainer>
					<ButtonContainer>
						<Button show={editedGoal} id="save" onClick={handleSave}>save</Button>
						<Button show={true} id="delete" onClick={handleDelete}>delete</Button>
						<Button show={true} id="cancel" onClick={handleCancel}>cancel</Button>
					</ButtonContainer>
				</FormContainer>
			</BlurContainer>
			<InfoWrapper>
				<ProfilePicture onClick={handleChangeProfilePicture}>
					<img src={`https://avatars.dicebear.com/api/bottts/${user.email}.svg`} alt="You, in your best moment!"/>
					<div>Edit</div>
				</ProfilePicture>
				<div className="info">
					<Title>Hi {user.name}</Title>
					<MotivationWrapper>
						<Quote>{motivationQuote.text}</Quote>
						<Author>{motivationQuote.author}</Author>
					</MotivationWrapper>
				</div>
			</InfoWrapper>
			<GoalsContainer>
				{goals.map((goal, index) => (
					<div key={index}>
						<GoalCard>
							<div id="movement">
								<span>🏅</span>
								<span onClick={() => setDisplayingGraph(goal.movement)}>{goal.movement}</span>
								{/*fixme: can't edit in mobile devices*/}
								<EditOutlinedIcon onClick={() => handleEditGoal(goal)}/>
								<span id="left">{
									(timeFrame(goal.start, goal.timeFrame)).left > 0 ?
										`${(timeFrame(goal.start, goal.timeFrame)).left} days left` :
										"expired"
								}</span>
							</div>
							<div id="strain">
								<div>
									<span>{goal.quantity}</span>
									&nbsp;
									<span>{goal.unit}</span>
								</div>
								<span>
                    {(timeFrame(goal.start, goal.timeFrame)).weeks > 0 ? "in " : ""}
									{(timeFrame(goal.start, goal.timeFrame)).weeks > 0 ? `${(timeFrame(goal.start, goal.timeFrame)).weeks} weeks ` : ""}
									{(timeFrame(goal.start, goal.timeFrame)).rest > 0 ? `${(timeFrame(goal.start, goal.timeFrame)).rest} days` : ""}
                  </span>
							</div>
						</GoalCard>
						<GoalChart goal={goal} show={displayingGraph}/>
					</div>

				))}
			</GoalsContainer>
			<EditButton onClick={() => {
				addGoal();
			}} ads={adMessage}>ADD A NEW GOAL</EditButton>
			<Review>
				<h2>{timeReview === 0 ? 'All':'Last'} <TimeReviewInput value={timeReview} onChange={(e) => handleTimeReview(e)}/> days:</h2>
				<h3>Time spent</h3>
				{accumulatedGoals.map((goal, index) => <span key={index}>{goal.goal} {tacticTime(goal.duration)}</span>)}
				<h3>Strain done</h3>
				{accumulatedGoals.map((goal, index) => <span key={index}>{goal.goal} :  {tacticVolume(goal.strainVol, goal.unit)}</span>)}
				{displayingGoal ? <AddGoal show={setDisplayingGoal}/> : null}

			</Review>
			<LogoutButton onClick={() => {
				handleLogout();
			}}>Log Out</LogoutButton>
		</Container>
	);
};

export default Profile;
