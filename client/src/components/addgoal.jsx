import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";

import {fiveColour, threeColour, twoColour} from "../conf";
import {useState} from "react";
import {addAGoal} from "../redux/goalApiCalls";

const Container = styled.div`
  display: ${({show}) => show ? 'flex' : 'none'};
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
  const [displayingForm, setDisplayingForm] = useState(true);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.user.currentUser);
  const [movement, setMovement] = useState("snatch");
  const [quantity, setQuantity] = useState("95");
  const [unit, setUnit] = useState("kgs");
  const [plan, setPlan] = useState("test");
  const [timeFrame, setTimeFrame] = useState("90");
  const [start, setStart] = useState(new Date());
  const [notes, setNotes] = useState("");

  const handleCancel = () => {
  };
  const handleSave = (e) => {
    e.preventDefault();
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
    console.log(newGoal);

    addAGoal(dispatch, newGoal);
    setDisplayingForm(false);


  };
    return (
      <Container show={displayingForm}>
          <Form>
            <label>Movement</label>
            <Input placeholder="Back-Squat" onChange={(e)=> setMovement(e.target.value)} required value={movement}/>
            <div>
              <label>Quantity</label>
              <Input placeholder="180" onChange={(e)=> setQuantity(e.target.value)} required value={quantity}/>
              <label>Unit</label>
              <select onChange={(e) => setUnit(e.target.value)} required value={unit}>
                <option value="kgs">kilos</option>
                <option value="lbs">pounds</option>
                <option value="mts">meters</option>
                <option value="mi">miles</option>
                <option value="fts">feets</option>
              </select>
              <label >Plan</label>
              <select onChange={(e) => setPlan(e.target.value)} required value={plan}>
                <option value="test">Max Attempt</option>
                <option value="accu">Accumulation</option>
              </select>
            </div>

            <div>
              <label>Days</label>
              <Input placeholder="90" onChange={(e)=> setTimeFrame(e.target.value)}/>
              <label>Start</label>
              <Input placeholder="2023-mar-10" onChange={(e)=> setStart(e.target.value)}/>
            </div>
            <label>Notes</label>
            <textarea placeholder="You can write why you want this." onChange={(e)=>setNotes(e.target.value)}/>

            <ButtonWrapper>
              <Button onClick={handleSave}>Save</Button>
              <Button onClick={handleCancel}>Cancel</Button>
            </ButtonWrapper>
          </Form>
        </Container>
    );
};

export default AddGoal;
