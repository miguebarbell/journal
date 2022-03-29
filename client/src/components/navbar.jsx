// external
import styled from "styled-components";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
// conf
import {COLOR_FOUR, NAVBAR_HEIGHT, COLOR_TWO} from "../conf";

const Container = styled.div`
  font-family: 'Comfortaa', cursive;
  color: ${COLOR_FOUR};
  background-color: ${COLOR_TWO};
  display: flex;
  justify-content: space-between;
  height: ${NAVBAR_HEIGHT};
  a {
    color: ${COLOR_FOUR};
    text-decoration: none;
    display: flex;
    align-items: center;
    margin: 0 1.5rem;
  }
`;

const Logo = styled.div`
  //background-color: black;
  height: 2rem;
  //color: white;
  display: flex;
  align-items: center;
  text-decoration: none;
`;


const Navbar = () => {
  // todo show navbar if user exists
  const {name} = useSelector(state => state.user.currentUser);
    return (
        <Container>
          <Link to="/">
            <Logo><FitnessCenterIcon/>&nbsp;Journal</Logo>
          </Link>
          {/*<Search placeholder="Search..."/>*/}
          <Link to="/profile">
            <Logo><AccountBoxIcon/>&nbsp;{name}</Logo>
          </Link>
        </Container>
    );
};

export default Navbar;
