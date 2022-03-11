import styled from "styled-components";
import {fiveColour, fourColour, threeColour, twoColour} from "../conf";

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  position: fixed;
  background-color: rgba(255, 255, 255, 0.5);
  top: 0;
  left: 0;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  border-radius: 3px;
  background-color: ${threeColour};
  * {
    margin: 0.25rem;
  }
`;

const Input = styled.input`
  
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  background-color: ${fiveColour};
  border: none;
  padding: 0.25rem;
  cursor: pointer;
  &:hover {
    color: ${fiveColour};
    background-color: ${twoColour};
  }
`;

const AddGoal = () => {
  const handleCancel = (e) => {
    // e.preventDefault();

  };
  const handleSave = (e) => {

    // e.preventDefault();
  };
    return (
        // <Container>
          <Container>
          <Form>
            <label>Movement</label>
            <Input placeholder="Select your movement"/>
            <label>Quantity</label>
            <Input placeholder="quantity"/>
            <label>Unit</label>
            <Input placeholder="unit"/>
            <ButtonWrapper>
              <Button onClick={handleSave}>Save</Button>
              <Button onClick={handleCancel}>Cancel</Button>
            </ButtonWrapper>
          </Form>
        </Container>
    );
};

export default AddGoal;
