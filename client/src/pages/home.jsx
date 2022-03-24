// external
import styled from "styled-components";
import {useSelector} from "react-redux";
// internal
import AddLog from "../components/addLog";
import Calendar from "../components/calendar";

const Container = styled.div`
  width: 100vw;
`;

const Home = () => {
  const showAddLog = useSelector((state) => state.log.active);

    return (
        <Container>
          {showAddLog && <AddLog/>}
          <Calendar/>
        </Container>
    );
};

export default Home;
