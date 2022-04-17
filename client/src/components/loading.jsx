// external
import styled from "styled-components"
import ReactLoading from "react-loading";
// conf
import {COLOR_FOUR} from "../conf";

const Container = styled.div`
  z-index: 10;
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
  color: ${COLOR_FOUR};
  display: ${({show}) => show ? "flex" : "none"};
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
const Loading = () => {
  // todo: check if this feature is working
  let show = true;
  return (
    <Container show={show}>
      <ReactLoading type="spinningBubbles" color={COLOR_FOUR}/>
      <span>Loading...</span>
    </Container>
  )
}

export default Loading
