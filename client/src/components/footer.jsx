import styled from "styled-components";
import {FOOTER_HEIGHT} from "../conf";

const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  height: ${FOOTER_HEIGHT};
`;
const Footer = () => {
    return (
        <Container>
            Footer component
        </Container>
    );
};

export default Footer;
