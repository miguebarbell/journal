import styled from "styled-components";

const Container = styled.div`
  background-color: dodgerblue;
  display: flex;
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
    return (
        <Container>
          <Logo>LOGO</Logo>
          <Search placeholder="Search..."/>
          <span>Hi Miguel</span>

        </Container>
    );
};

export default Navbar;
