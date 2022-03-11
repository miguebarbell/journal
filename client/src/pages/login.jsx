import styled from "styled-components";
import {footerHeight, fourColour, navbarHeight, oneColour, threeColour, twoColour} from "../conf";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../redux/apiCalls";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - ${navbarHeight} - ${footerHeight});
  background-color: ${threeColour};
  flex-direction: column;
`;
export const FormContainer = styled.form`
  border: 1px solid;
  display: flex;
  flex-direction: column;
  * {
    margin: 0.5rem;
    border-radius: 3px;
  }
  padding: 1.5rem;
  border-radius: 3px;
  
`;

export const Button = styled.button`
  background-color: ${twoColour};
  color: ${fourColour};
  border: 2px solid ${twoColour};
  padding: 0.5rem;
  cursor: pointer;
  text-transform: uppercase;
  &:hover {
    color: ${twoColour};
    background-color: ${fourColour};
    border: 2px solid ${twoColour};
  }
  
`;

export const Input = styled.input`
  background-color: inherit;
  border: 1px solid ${twoColour};
  &:focus {
    color: ${fourColour};
    background-color: ${oneColour};
  }
`;

export const Error = styled.span``;

const Login = () => {
  const { isFetching, error } = useSelector(state => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, {email, password});

  };
  console.log(useSelector(state => state.user));
    return (
        <Container>
          <FormContainer>
            LOGIN
            <Input required placeholder="Username" onChange={(e) => setEmail(e.target.value)}/>
            <Input required type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            <Button onClick={handleClick}>Login</Button>
            {error && <Error>Something went wrong...</Error>}
          </FormContainer>

        </Container>
    );
};

export default Login;
