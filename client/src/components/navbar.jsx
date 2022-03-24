// external
import styled from "styled-components";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
// conf
import {navbarHeight} from "../conf";

const Container = styled.div`
  //background-color: dodgerblue;
  display: flex;
  justify-content: space-between;
  height: ${navbarHeight};
  padding: 0.5rem;
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
  const {name} = useSelector(state => state.user.currentUser);
    return (
        <Container>
          <Link to="/">
            <Logo><FitnessCenterIcon/> Journal</Logo>
          </Link>
          {/*<Search placeholder="Search..."/>*/}
          <Link to="/profile">
            <Logo><AccountBoxIcon/>{name}</Logo>
          </Link>
        </Container>
    );
};

export default Navbar;
