import styled from "styled-components";
import {FOOTER_HEIGHT, COLOR_FOUR, NAVBAR_HEIGHT, COLOR_ONE, COLOR_THREE, COLOR_TWO} from "../conf";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../redux/userApiCalls";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - ${NAVBAR_HEIGHT});
  background-color: ${COLOR_THREE};
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
  background-color: ${COLOR_TWO};
  color: ${COLOR_FOUR};
  border: 2px solid ${COLOR_TWO};
  padding: 0.5rem;
  cursor: pointer;
  text-transform: uppercase;
  &:hover {
    color: ${COLOR_TWO};
    background-color: ${COLOR_FOUR};
    border: 2px solid ${COLOR_TWO};
  }
`;

export const Input = styled.input`
  background-color: inherit;
  border: 1px solid ${COLOR_TWO};
  &:focus {
    color: ${COLOR_FOUR};
    background-color: ${COLOR_ONE};
  }
`;

export const Error = styled.span``;

const Login = () => {
  const { isFetching, error } = useSelector(state => state.user);
  // todo make a loading interface when user is fetching
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, {email, password});
  };
  // console.log(useSelector(state => state.user));
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
