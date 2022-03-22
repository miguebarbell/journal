// internal
import styled from "styled-components";
import {useState} from "react";
// external
import AddLog from "../components/addLog";
import Calendar from "../components/calendar";

const Container = styled.div`
  width: 100vw;
`;


const Home = () => {
// todo take the stat from redux
  const [showAddLog, setShowAddLog] = useState(true);
    return (
        <Container>
          {showAddLog && <AddLog/>}
          <Calendar/>
        </Container>
    );
};

export default Home;
