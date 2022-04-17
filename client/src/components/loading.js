// take the entire screen
// make an animation

import styled from "styled-components"
import {COLOR_FOUR} from "../conf";

const Container = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
  color: ${COLOR_FOUR};
  display: ${({show}) => show ? "flex" : "none"};
`
const Loading = () => {
  let show = true;
  return (
    <Container show={show}>
      <span>L</span>
      <span>O</span>
      <span>A</span>
      <span>D</span>
      <span>I</span>
      <span>N</span>
      <span>G</span>
    </Container>
  )
}

export default Loading
