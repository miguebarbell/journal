// external
import styled from "styled-components";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import InfoIcon from '@mui/icons-material/Info';
// internal
import logo from '../assets/flag-goal.png';
// conf
import {COLOR_FOUR, NAVBAR_HEIGHT, COLOR_TWO, SECONDARY, PRIMARY} from "../conf";

const Container = styled.div`
  font-family: 'Comfortaa', cursive;
  color: ${COLOR_FOUR};
  background-color: ${COLOR_TWO};
  display: ${({show}) => show ? "flex" : "none"};
  justify-content: space-between;
  height: ${NAVBAR_HEIGHT};
  position: sticky;
  top: 0;
  z-index: 10;

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
  &:hover {
    color: ${SECONDARY};
    // text-decoration: underline ${PRIMARY};
  }

  svg.aboutNav {
    @media only screen
    and (min-device-width : 600px) {
      display: none;
    }
  }
  span.aboutNav {
    @media only screen
    and (min-device-width : 600px) {
      display: none;
    }
    @media only screen and (max-device-width :400px) {
      display: none;
    }
  }
  
`;

const Banner = styled.div`
  display: flex;
  @media only screen
  and (max-device-width : 600px) {
    display: none;
  }
  
  width: 100%;
  justify-content: center;
  align-items: center;
  img {
    max-height: 80%;
  }
  div {
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    span {
      color: ${COLOR_FOUR};
      &#name {
        
        font-weight: bold;
        letter-spacing: 0.15rem;
        font-size: 1.5rem;
        //text-shadow: 0 2px 3px ${SECONDARY + "80"};
        text-shadow: -1px -1px 1px ${COLOR_FOUR + "10"}, 1px 1px 1px ${COLOR_TWO + "90"};
        
      }
      &#legend {
        font-family: 'Special Elite', cursive;
        letter-spacing: 0.25rem;
        font-size: 0.85rem;
        //text-shadow: 0 2px 3px ${SECONDARY + "80"};
         text-shadow: -1px -1px 1px ${COLOR_FOUR + "10"}, 1px 1px 1px ${COLOR_TWO + "90"};
      }
    }
    
  }
`;

const Navbar = () => {

  // show navbar if user exists
  const {name} = useSelector(state => state.user.currentUser);
    return (
        <Container show={name}>
          <Link to="/">
            <Logo><FitnessCenterIcon/>&nbsp;<span>Calendar</span></Logo>
          </Link>
          <Link to="/about">
            <Logo>
              <InfoIcon className="aboutNav"/>
              &nbsp;<span className="aboutNav">About</span>
            </Logo>
            <Banner>
              <img src={logo} alt='no straight line to a flag.'/>
              <div>
                <span id="name">
                  Journal
                </span>
                <span id="legend">
                  Achieve Anything
                </span>
              </div>
            </Banner>
          </Link>
          <Link to="/profile">
            <Logo><AccountBoxIcon/>&nbsp;<span>{name}</span></Logo>
          </Link>
        </Container>
    );
};

export default Navbar;
