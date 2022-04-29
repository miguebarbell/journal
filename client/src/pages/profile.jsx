// external
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
// internal
import AddGoal from "../components/addgoal";
import {logOut} from "../redux/userRedux";
// conf and variables
import {COLOR_FOUR, NAVBAR_HEIGHT, COLOR_THREE, COLOR_TWO, PRIMARY, SECONDARY} from "../conf";
import {profileBanner} from "../components/quotes";
import GoalChart from "../components/goalChart";


const Container = styled.div`
  color: ${COLOR_FOUR};
  background-color: ${COLOR_TWO};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: calc(100vh - ${NAVBAR_HEIGHT});
`;
const Title = styled.h1`
  font-family: 'Permanent Marker', cursive;
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
  }
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
  max-height: 30vh;
  display: flex;
  align-items: center;
  border-bottom: 1px groove ${COLOR_FOUR};
  * {
    margin: 1rem;
  }
`;
const ProfilePicture = styled.img`
  border-radius: 50%;
  height: 15vh;
  width: 15vh;
  background-image: linear-gradient(27deg, ${PRIMARY}, ${SECONDARY})
`;
const MotivationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Quote = styled.span`
  font-style: italic;
  font-size: 1.5rem;
  font-family: 'Just Another Hand', cursive;
`;
const Author = styled.span`
  font-size: 0.75rem;
  font-weight: bold;
  font-family: 'Cinzel', serif;
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
      span:nth-child(1){
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
      }
      &:hover {
        //border-color: blue;
        background-image: linear-gradient(${SECONDARY + "90"}, ${PRIMARY + "85"});
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
const Profile = () => {
  // todo a way to delete or edit goals
  const motivationQuote = profileBanner[Math.floor(Math.random() * profileBanner.length)];
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logOut());
  };
  const [displayingGoal, setDisplayingGoal] = useState(false);
  const [displayingGraph, setDisplayingGraph] = useState(false);
  const timeReview = 30;
  const addGoal = () => {
    setDisplayingGoal(true);
    document.title = "Adding goal.";
  };
  const handleEditGoal = () => {
    alert('editing goal')
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
    };
    logsForGoal.forEach(log => {
      response.strain += log.strain
      response.sets += log.sets
      response.reps += log.reps
      response.duration += log.duration
    })
    response.avgStrainPerSet = isNaN(response.strain / response.sets) ? 0 : Math.round(response.strain / response.sets);
    return response;
  };
  const accumulatedGoals = goals.map(goal => accumulative(goal.movement, timeReview))
  return (
    <Container>
      <InfoWrapper>
        <ProfilePicture src={`https://avatars.dicebear.com/api/bottts/${user.email}.svg`}/>
        <Title>Hi {user.name}</Title>
        <MotivationWrapper>
          <Quote>{motivationQuote.text}</Quote>
          <Author>{motivationQuote.author}</Author>
        </MotivationWrapper>
      </InfoWrapper>
          <GoalsContainer>
            {goals.map((goal, index) => (
              <div key={index}>
              <GoalCard>
                <div id="movement">
                  <span>🏅</span>
                  <span onClick={() => setDisplayingGraph(goal.movement)}>{goal.movement}</span>
                  <EditOutlinedIcon onClick={handleEditGoal}/>
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
                    {(timeFrame(goal.start, goal.timeFrame)).weeks > 0 ? `${(timeFrame(goal.start, goal.timeFrame)).rest} weeks ` : ""}
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
      }}>ADD A NEW GOAL</EditButton>
      <span>you should focus in one at time</span>
      <h2>Last {timeReview} days:</h2>
      <h3>Time</h3>
      {accumulatedGoals.map((goal, index) => <span key={index}>{goal.goal} : {goal.duration}</span>)}
      <h3>Distance</h3>
      <h3>Strain</h3>
      {accumulatedGoals.map((goal, index) => <span key={index}>{goal.goal} : {goal.strain}</span>)}
      {displayingGoal ? <AddGoal/> : null}
      <LogoutButton onClick={() => {
        handleLogout();
      }}>Log Out</LogoutButton>
    </Container>
    );
};

export default Profile;
