import styled from "styled-components";
import {COLOR_FOUR, COLOR_ONE, COLOR_THREE, COLOR_TWO, PRIMARY, SECONDARY} from "../conf";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../redux/userApiCalls";
import img from '../bg/highkick.jpg';
import {Link} from "react-router-dom";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  flex-direction: column;
  background-image: linear-gradient(to bottom, ${PRIMARY + "50"}, ${SECONDARY + "50"}) , url(${({bg}) => bg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

// export const GrayLayer = styled.div`
//   height: 100%;
//   width: 100%;
//   background-image:
// `;

export const FormContainer = styled.form`
  background-color: ${COLOR_THREE};
  border: 1px solid;
  display: flex;
  div {
    a {
      text-decoration: none;
    }
    span {
      padding: 10px;
    }
    #title {
      color: ${COLOR_TWO};
      font-weight: bold;
      text-decoration: underline;
    }
    #subtitle {
      color: ${COLOR_TWO};
      &:hover {
        text-decoration: underline;
      }
    }
  }
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
  padding: 0.35rem;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bold;
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
  const {error} = useSelector(state => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, {email, password});
  };
    return (
        <Container bg={img}>
          <FormContainer>
            <div>
              <span id="title">Login</span> <Link to="/register"><span id="subtitle">Register</span></Link>
            </div>
            <Input required placeholder="Username" onChange={(e) => setEmail(e.target.value)}/>
            <Input required type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            <Button onClick={handleClick}>Login</Button>
            {error && <Error>Something went wrong...</Error>}
          </FormContainer>
        </Container>
    );
};

export default Login;
