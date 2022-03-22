import styled from "styled-components";
import {useSelector} from "react-redux";
import {threeColour, twoColour} from "../conf";

const BlurContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 10;
`;
const FormContainer = styled.div`
  background-color: white;
  padding: 3rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  width: 20rem;
`;
const Title = styled.h1``;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  div {
    margin: 0.5rem 0;
    * {
      margin: 0 0.25rem;
    }
  }
`;
const CreateMovementButton = styled.button`
  //height: 2rem;
  cursor: pointer;
`;
const ButtonSubmit = styled.button`
  cursor: pointer;
`;
const HeaderWrapper = styled.div`
  display: flex;
  //flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const MovementWrapper = styled.div`
  //background-color: green;
  display: flex;
  justify-content: space-between;
`;
const DataContainer = styled.div`
  //background-color: blue;
  display: flex;
  justify-content: space-between;
`;
const DataWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 4rem;
  &:hover:after {
    color: ${twoColour};
    position: absolute;
    background: white;
    width: 6rem;
    font-size: 0.85rem;
    display: block;
    border: 1px solid ${threeColour};
    border-radius: 10px;
    padding: 0.5rem;
    transform: translate(-25%, -100%)
  }
  &#strain:hover:after { 
    content: "strain";
  }
  &#reps:hover:after {
    content: "reps";
  }
  &#sets:hover:after {
    content: "sets";
  }
  &#time:hover:after {
    content: "time";
  }
`;
const NoteWrapper = styled.div`
  display: flex;
  textarea {
    width: 100%;
    resize: none;
    height: 3rem;
  }
`;

const AddLog = () => {
  // extract all the data from store
  const goals = useSelector((state) => state.training.goals);

  const handleSubmit = (e) => {
    e.preventDefault();

  };
    return (
      <BlurContainer>
        <FormContainer>
          <HeaderWrapper>
            <Title>DATE</Title>
            <CreateMovementButton>Create new goal</CreateMovementButton>
          </HeaderWrapper>
          <Form>
            <MovementWrapper>
              <select>
                {goals.map(goal =>
                  <option value={goal.movement}>{goal.movement} ({goal.unit})</option>
                )}
              </select>
            </MovementWrapper>
            <DataContainer>
              <DataWrap id="strain" >
                <label>Strain</label>
                <input placeholder="90"/>
              </DataWrap>
              <DataWrap id="reps" >
                <label>Reps</label>
                <input placeholder=""/>
              </DataWrap>
              <DataWrap id="sets">
                <label>Sets</label>
                <input placeholder=""/>
              </DataWrap>
              <DataWrap id="time">
                <label>Time</label>
                <input placeholder="10"/>
              </DataWrap>
            </DataContainer>
            <NoteWrapper>
              <label>Additional note</label>
              <textarea />
            </NoteWrapper>
            <ButtonSubmit submit={handleSubmit}>Register!</ButtonSubmit>
          </Form>
        </FormContainer>
      </BlurContainer>
    );
};

export default AddLog;
