import styled from "styled-components";
import Calendar from "../components/calendar";

const Container = styled.div`
  width: 100vw;
`;

const Home = () => {
    return (
        <Container>
          <Calendar/>
        </Container>
    );
};

export default Home;
