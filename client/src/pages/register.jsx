import {Button, Container, FormContainer, Input} from "./login";

const Register = () => {
  const handleClick = (e) => {
    e.preventDefault();
  };
    return (
        <Container>
          <FormContainer>
            Register
            <Input type="text" placeholder="email"/>
            <Input type="password" placeholder="password"/>
            <Input type="password" placeholder="confirm password"/>
            <Button onClick={handleClick}>Register</Button>
          </FormContainer>
        </Container>
    );
};

export default Register;
