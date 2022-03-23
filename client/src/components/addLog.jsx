// external
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import CloseIcon from '@mui/icons-material/Close';
// internal
import {setActive} from "../redux/logRedux";
// conf
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
const Title = styled.h1`
  &:after {
    content: "x"
  }
`;
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
    max-width: 6rem;
    font-size: 0.85rem;
    display: block;
    border: 1px solid ${threeColour};
    border-radius: 10px;
    padding: 0.5rem;
    transform: translate(-25%, -100%);
  }
  &#close {
    cursor: pointer;
    align-items: end;
    transform: translate(25%, -200%);
    &:hover {
      color: red;
    }
  }
  &#close:hover:after {
    content: "Close";
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
  &#note:hover:after {
    content: "note";
  }
  &#note {
    display: flex;
    width: 100%;
    textarea {
      width: 100%;
      resize: none;
      height: 3rem;
    }
  }
`;

const AddLog = () => {
  // extract all the data from store
  const goals = useSelector((state) => state.training.goals);

  const dispatch = useDispatch();
  const handleCancel = () => {
    // save the draft
    dispatch(setActive());
  };
  const handleSubmit = (e) => {
    e.preventDefault();

  };
    return (
      <BlurContainer>
        <FormContainer>
          <HeaderWrapper>
            <Title>DATE</Title>
            <CreateMovementButton>Create new goal</CreateMovementButton>
            <DataWrap id="close">
              <CloseIcon onClick={handleCancel}/>
            </DataWrap>
          </HeaderWrapper>
          <Form>
            <MovementWrapper>
              <select>
                {/* take the movement from redux*/}
                {goals.map((goal, index) =>
                  <option key={index} value={goal.movement}>{goal.movement} ({goal.unit})</option>
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
            <DataWrap id="note">
              <label>Additional note</label>
              <textarea />
            </DataWrap>
            <ButtonSubmit submit={handleSubmit}>Register!</ButtonSubmit>
          </Form>
        </FormContainer>
      </BlurContainer>
    );
};

export default AddLog;
