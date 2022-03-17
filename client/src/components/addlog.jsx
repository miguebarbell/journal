import styled from "styled-components";

const Container = styled.div``;
const Title = styled.h1``;
const Form = styled.form``;
const CreateMovementButton = styled.button``;
const ButtonSubmit = styled.button``;

const Addlog = (day) => {
  // extract all the data from store

  const handleSubmit = (e) => {
    e.preventDefault();

  };
    return (
        <Container>
          <Title>Log a movement</Title>
          <Form>
            <CreateMovementButton>Create a movement</CreateMovementButton>
            <select>
              <option value="Snatch">Snatch</option>
            </select>
            <input placeholder="90"/>
            <ButtonSubmit submit={handleSubmit}>Submit</ButtonSubmit>

          </Form>
        </Container>
    );
};

export default Addlog;
