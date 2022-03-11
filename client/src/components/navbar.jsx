import styled from "styled-components";
import {Link} from "react-router-dom";
import {navbarHeight} from "../conf";
import {useSelector} from "react-redux";

const Container = styled.div`
  //background-color: dodgerblue;
  display: flex;
  justify-content: space-between;
  height: ${navbarHeight};
  padding: 0.5rem;
`;

const Logo = styled.div`
  background-color: black;
  height: 2rem;
  color: white;
`;

const Search = styled.input`
  border: none;
`;

const Navbar = () => {
  const {name} = useSelector(state => state.user.currentUser);
    return (
        <Container>
          <Link to="/">
            <Logo>LOGO</Logo>
          </Link>
          {/*<Search placeholder="Search..."/>*/}
          <Link to="/profile">
            <span>{name}</span>
          </Link>
        </Container>
    );
};

export default Navbar;
