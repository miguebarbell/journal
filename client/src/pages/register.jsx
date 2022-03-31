import {Button, Container, FormContainer, Input} from "./login";
import img from "../bg/Muay_Thai_Fight_Us_Vs_Burma.jpeg";
import {Link} from "react-router-dom";

const Register = () => {
  const handleClick = (e) => {
    e.preventDefault();
  };
    return (
        <Container bg={img}>
          <FormContainer>
            <div>
              <span id="title">Register</span> <Link to="/login"> <span id="subtitle">Login</span></Link>
            </div>
            <Input type="text" placeholder="email"/>
            <Input type="password" placeholder="password"/>
            <Input type="password" placeholder="confirm password"/>
            <Button onClick={handleClick}>Register</Button>
          </FormContainer>
        </Container>
    );
};

export default Register;
