// external libs
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
// internal
import AddGoal from "../components/addgoal";
import {logOut} from "../redux/userRedux";
// conf and variables
import {threeColour} from "../conf";
import {profileBanner} from "../components/quotes";


const Container = styled.div``;

const Title = styled.h1``;

const EditButton = styled.button`
  border: 1px solid black;
  border-radius: 2px;
  cursor: pointer;
  padding: 2px;
  margin: 0 5px;
  &:hover { 
    background-color: ${threeColour};
  }
`;

const LogoutButton = styled.button`
  border: 1px solid black;
  border-radius: 2px;
  cursor: pointer;
  &:hover {
    background-color: red;
  }
`;

const InfoWrapper = styled.div`
  max-height: 30vh;
  display: flex;
  //justify-content: flex-start;
  align-items: center;
  border: 1px solid black;
  * {
    margin: 1rem;
  }
`;
const ProfilePicture = styled.img`
  //border: 1px solid liner-gradient(blue, white);
  border-radius: 50%;
  height: 15vh;
  width: 15vh;
  background-image: linear-gradient(27deg, red, yellow)
`;

const MotivationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Quote = styled.span``;
const Author = styled.span`
  font-size: 0.75rem;
  font-weight: bold;
`;

const Profile = () => {
  const motivationquote = profileBanner[Math.floor(Math.random() * profileBanner.length)];
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


  const daysLeft = (startDay, daysToComplete) => {
    const stringDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const stringMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const beginDay = new Date(startDay);
    const finishDay = new Date(startDay);
    finishDay.setDate(beginDay.getDate() + daysToComplete);
    const daysLeft = Math.round((finishDay - new Date()) / (1000 * 60 * 60 * 24));
    return `${stringDays[finishDay.getDay()]} ${finishDay.getDate()}  / ${stringMonths[finishDay.getMonth()]} / ${finishDay.getFullYear()} --> ${daysLeft} days left`;
  };

    return (
        <Container>
          <InfoWrapper>
            <ProfilePicture src={`https://avatars.dicebear.com/api/bottts/${user.email}.svg`}/>
            <Title>Hi {user.name}</Title>
            <MotivationWrapper>

              <Quote>{motivationquote.text}</Quote>
              <Author>{motivationquote.author}</Author>
            </MotivationWrapper>
          </InfoWrapper>
          <span>Here you can set new fitness goals and review your journey.</span>
          <ul>Goals
            <EditButton onClick={() => {addGoal();}}>ADD A NEW GOAL</EditButton>
            {goals.map((goal, index) => (
              <li key={index}>{goal.movement} {goal.quantity} {goal.unit} before {daysLeft(goal.start, goal.timeFrame)}
              </li>
            ))}
          </ul>
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
