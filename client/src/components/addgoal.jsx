// external
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
// internal
import {addAGoal} from "../redux/goalApiCalls";
// conf
import {COLOR_FIVE, COLOR_THREE, COLOR_TWO} from "../conf";

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  align-items: center;
  flex-direction: column;
  justify-content: center;
  color: ${COLOR_TWO};
  font-family: 'Cantarell', sans-serif;
  font-weight: bold;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  border-radius: 3px;
  background-color: ${COLOR_THREE};
  * {
    margin: 0.25rem;
  }
  textarea,
  div select {
    background-color: ${COLOR_THREE};
    border: 1px solid ${COLOR_TWO};
    border-radius: 5px;
    font-family: 'Cantarell', sans-serif;
  }
`;
const Input = styled.input`
  background-color: ${COLOR_THREE};
  border: 1px solid ${COLOR_TWO};
  border-radius: 5px;
  margin-left: 0.5rem;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Button = styled.button`
  background-color: ${({color}) => color === "" ? "green" : "red"};
  border: 2px solid ${({color}) => color === "" ? "green" : "red"};
  //border: none;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  border-radius: 5px;
  font-weight: bold;
  &:hover {
    //color: ${COLOR_FIVE};
    color: ${({color}) => color === "" ? "green" : "red"};
    background-color: ${({color}) => color === "" ? "white" : "white"};
  }
`;
const Error = styled.div`
  color: red;
  font-weight: bold;
  height: 100%;
  width: 100%;
  text-transform: capitalize;
  text-align: center;
`;

const AddGoal = ({show}) => {
  // const [displayingForm, setDisplayingForm] = useState(true);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [movement, setMovement] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("kgs");
  const [plan, setPlan] = useState("test");
  const [timeFrame, setTimeFrame] = useState("90");
  const [start, setStart] = useState((new Date()).toDateString());
  const [notes, setNotes] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleError = (message) => {
    setErrorMessage(message);
    window.setTimeout(()=> {
      setErrorMessage("")
    }, 2000)

  }
  const handleCancel = () => {
    show(false);
    document.title =  `Journal App - Goals.`;
  }
  const handleSave = () => {
    // e.preventDefault();
    const newGoal = {
      user: user.email,
      movement: movement,
      quantity: quantity,
      unit: unit,
      plan: plan,
      timeFrame: timeFrame,
      start: start,
      notes: notes
    };
    if (unit === null || quantity === null) {
      handleError("select a quantity")
      return
    }
    addAGoal(dispatch, newGoal);
    show(false);
    document.title =  `Journal App - Goals.`;
  };
    return (
        <Container>
          <Form>
            <label>Movement</label>
            <Input placeholder="Back-Squat" onChange={(e)=> setMovement(e.target.value)} required value={movement}/>
            <div>
              <label>Quantity</label>
              <Input placeholder="180" onChange={(e)=> setQuantity(e.target.value)} required value={quantity}/>
              <label>Unit</label>
              <select onChange={(e) => setUnit(e.target.value)} required value={unit}>
                <option value="kgs">Kilos</option>
                <option value="lbs">Pounds</option>
                <option value="mts">Meters</option>
                {/*<option value="mi">miles</option>*/}
                <option value="fts">Feet</option>
                <option value="min">Minutes</option>
                {/*<option value="hrs">hours</option>*/}
                {
                  plan === 'habit' || plan === 'accu' ? <option value="times">Times</option> : null
                }
              </select>
              <label >Plan</label>
              <select onChange={(e) => setPlan(e.target.value)} required value={plan}>
                <option value="test">Max Attempt</option>
                <option value="accu">Accumulate</option>
                <option value="habit">Every Day</option>
              </select>
            </div>

            <div>
              <label>Days</label>
              <Input placeholder="90" onChange={(e)=> setTimeFrame(e.target.value)}/>
              <label>Start</label>
              <Input placeholder="2023-mar-10" onChange={(e)=> setStart(e.target.value)}/>
            </div>
            <label>Notes</label>
            <textarea placeholder="You can add here what is your motivation here." onChange={(e)=>setNotes(e.target.value)}/>
            <ButtonWrapper>
              <Button onClick={handleSave} color={errorMessage}>Save</Button>
              <Error>{errorMessage}</Error>
              <Button onClick={handleCancel}>Cancel</Button>
            </ButtonWrapper>
          </Form>
        </Container>
    );
};

export default AddGoal;
