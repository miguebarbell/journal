import styled from "styled-components";
import {footerHeight} from "../conf";

const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  height: ${footerHeight};
`;
const Footer = () => {
    return (
        <Container>
            Footer component
        </Container>
    );
};

export default Footer;
