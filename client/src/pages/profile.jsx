// external
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
// internal
import AddGoal from "../components/addgoal";
import {logOut} from "../redux/userRedux";
// conf and variables
import {COLOR_FOUR, NAVBAR_HEIGHT, COLOR_THREE, COLOR_TWO, PRIMARY, SECONDARY} from "../conf";
import {profileBanner} from "../components/quotes";


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
  }
    span:nth-child(3) {    
      font-family: 'Share Tech Mono', monospace;
      color: ${COLOR_TWO};
    }
    span#left {
      font-size: 1rem;
      font-weight: lighter;
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
  const addGoal = () => {
    setDisplayingGoal(true);
    document.title = "Adding goal.";
  };
  const user = useSelector((state) => state.user.currentUser);
  const goals = useSelector((state) => state.training.goals);


  const timeFrame = (startDay, daysToComplete) => {
    const stringDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const stringMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const beginDay = new Date(startDay);
    const finishDay = new Date(startDay);
    finishDay.setDate(beginDay.getDate() + daysToComplete);
    const daysLeftToComplete = Math.round((finishDay - new Date()) / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(daysLeftToComplete/7);
    const rest = daysLeftToComplete%7;
    return {
      left : daysLeftToComplete,
      weeks: weeks,
      rest: rest

    };
  };

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
              <GoalCard key={index}>
                <div id="movement">
                  <span>🏅</span>
                  <span>{goal.movement}</span>
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
                    {(timeFrame(goal.start, goal.timeFrame)).rest > 0 ? `${(timeFrame(goal.start, goal.timeFrame)).rest} days` : ""}</span>
                </div>
              </GoalCard>
            ))}
          </GoalsContainer>
          <EditButton onClick={() => {addGoal();}}>ADD A NEW GOAL</EditButton>
          <span>you should focus in one at time</span>
          <h2>Last 30 days:</h2>
          <h3>Time</h3>
          <h3>Distance</h3>
          <h3>Weight</h3>
          { displayingGoal ? <AddGoal/> : null}
          <LogoutButton onClick={() => {handleLogout();}}>Log Out</LogoutButton>
        </Container>
    );
};

export default Profile;
