import styled from "styled-components";
import {useSelector} from "react-redux";

import AddGoal from "../components/addgoal";
import {threeColour} from "../conf";
import {useEffect} from "react";


const Container = styled.div``;

const Title = styled.h1``;

const EditButton = styled.button`
  border: 1px solid black;
  border-radius: 2px;
  cursor: pointer;
  &:hover { 
    background-color: ${threeColour};
  }
`;



const Profile = () => {
  let displayingGoal = false;
  const addGoal = () => {
    displayingGoal = true;
    console.log(displayingGoal);
    document.title = "Adding goal.";
  };
  const user = useSelector((state) => state.user.currentUser);
    return (
        <Container>

          <Title>Hi {user.name}</Title>
          <span>Here you can set new fitness goals and review your journey.</span>
          <h2>Goals:
          <EditButton onClick={() => {addGoal();}}>ADD</EditButton>
          </h2>
          <span>you should focus in one at time</span>
          <h3>Run 80k at month
            <EditButton>EDIT</EditButton>
          </h3>
          <h3>Deadlift 160kgs
            <EditButton>EDIT</EditButton> </h3>
          <h3>Body-weight 70kgs
            <EditButton>EDIT</EditButton>
          </h3>
          <h2>Last 30 days:</h2>
          <h3>Time</h3>
          <h3>Distance</h3>
          <h3>Weight</h3>
          {/*{displayingGoal ? <AddGoal/> }*/}
        </Container>
    );
};

export default Profile;
