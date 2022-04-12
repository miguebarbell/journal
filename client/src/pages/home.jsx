// external
import styled from "styled-components";
import {useSelector} from "react-redux";
// internal
import AddLog from "../components/addLog";
import Calendar from "../components/calendar";
import ModifyLog from "../components/modifyLog";

const Container = styled.div`
  width: 100vw;
`;

const Home = () => {
  const showAddLog = (useSelector((state) => state.log.active) !== false);
  const showLog = useSelector((state) => state.training.showing);

    return (
        <Container>
          {showAddLog && <AddLog/>}
          {showLog && <ModifyLog/>}
          <Calendar/>
        </Container>
    );
};

export default Home;
