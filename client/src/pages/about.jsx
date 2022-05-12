import styled from "styled-components";
import {COLOR_FIVE, COLOR_FOUR, COLOR_ONE, COLOR_THREE, COLOR_TWO, PRIMARY, SECONDARY} from "../conf";
import img from '../bg/so-you-wanna-be-an-mma-fighter.jpg';
import {useState} from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 100vw;
  min-height: 100vh;
  background-image: linear-gradient(to bottom, ${PRIMARY + "50"}, ${SECONDARY + "50"}) , url(${({bg}) => bg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  div.spacer {
    height: 2vh;
    width: 100vw;
    //background-color: red;
  }
  a {
    //text-decoration: none;
    color: ${COLOR_FOUR};
  }
`;
const Section = styled.div`
  background-color: ${COLOR_TWO};
  width: 100vw;
  color: ${ COLOR_FOUR };
  padding: 0.5rem 0;
  h2:hover {
    color: ${PRIMARY};
    text-decoration: underline;
  }
  h2 {
    cursor: pointer;
  }
  ul {
    list-style: none;
    li {
      cursor: pointer;
      &:hover {
        //text-decoration: underline;
      }
    }
  }
`;
const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100vw;
  background-color: ${COLOR_TWO};
  color: ${ COLOR_FOUR };
  padding: 1em 0.5rem;
  marquee {
    font-weight: bold; 
    overflow: hidden;
  }
`;
const ItemDocumentation = styled.div`
  background-color: ${COLOR_THREE};
  color: ${COLOR_TWO};
  box-shadow: inset 0 0 4px ${COLOR_ONE}; 
  margin: 1rem 0;
  &#banner {
    display: ${({show}) => show === 'profile-banner' ? 'flex' : 'none'};
    //color: ${({show}) => show === 'profile-banner' ? SECONDARY : COLOR_FOUR};
  }
  &#goal {
    display: ${({show}) => show === 'profile-goal' ? 'flex' : 'none'};
  }
  &#chart {
    display: ${({show}) => show === 'profile-chart' ? 'flex' : 'none'};
  }
  &#addGoal {
    display: ${({show}) => show === 'profile-addGoal' ? 'flex' : 'none'};
  }
  &#overview {
    display: ${({show}) => show === 'profile-overview' ? 'flex' : 'none'};
  }
  &#tab {
    display: ${({show}) => show === 'calendar-tab' ? 'flex' : 'none'};
  }
  &#month {
    display: ${({show}) => show === 'calendar-month' ? 'flex' : 'none'};
  }
  &#day {
    display: ${({show}) => show === 'calendar-day' ? 'flex' : 'none'};
  }
  &#addLog {
    display: ${({show}) => show === 'calendar-addLog' ? 'flex' : 'none'};
  }
  &#editLog {
    display: ${({show}) => show === 'calendar-editLog' ? 'flex' : 'none'};
  }
  &#dayOverview {
    display: ${({show}) => show === 'calendar-dayOverview' ? 'flex' : 'none'};
  }
  &#formulas {
    display: ${({show}) => show === 'about-formulas' ? 'flex' : 'none'};
  }
  &#services {
    display: ${({show}) => show === 'about-services' ? 'flex' : 'none'};
  }
  &#miguel {
    display: ${({show}) => show === 'about-miguel' ? 'flex' : 'none'};
  }
`;
const List = styled.div`
  flex-direction: column;
  padding: 0 3rem;
  div h4 {
    cursor: pointer;
    margin: 0.5rem 0;
    &:hover {
      color: ${PRIMARY};
      text-decoration: underline;
    }
  }
  &#profile-section {
    display: ${({show}) => show.includes('profile') ? 'flex' : 'none'};
  }
  &#calendar-section {
    display: ${({show}) => show.includes('calendar') ? 'flex' : 'none'};
  }
  &#about-section {
    display: ${({show}) => show.includes('about') ? 'flex' : 'none'};
  }
`;
const SectionTitle = styled.h2`
  padding: 0 2rem;
  &#calendar {
    color: ${({isActive}) => isActive.includes('calendar') ? COLOR_THREE : 'inherit'};
    text-decoration: ${({isActive}) => isActive.includes('calendar') ? 'underline' : 'inherit'};
  }
  &#profile {
    color: ${({isActive}) => isActive.includes('profile') ? COLOR_THREE : 'inherit'};
    text-decoration: ${({isActive}) => isActive.includes('profile') ? 'underline' : 'inherit'};
  }
  &#about {
    color: ${({isActive}) => isActive.includes('about') ? COLOR_THREE : 'inherit'};
    text-decoration: ${({isActive}) => isActive.includes('about') ? 'underline' : 'inherit'};
  }
`;

const About = () => {
  // this state handle all the opens sections.
  const [openSection, setOpenSection] = useState('')
  const handleOpenSection = (sectionToOpen) => {
    if (sectionToOpen === openSection) {
      if (sectionToOpen.includes('-')) setOpenSection(sectionToOpen.split('-')[0])
      else setOpenSection('')
    }
    else setOpenSection(sectionToOpen)
  }
    return (
        <Container bg={img}>
          <Section >
            <SectionTitle id="calendar" onClick={() => handleOpenSection("calendar")} isActive={openSection}>Calendar</SectionTitle>
            <List show={openSection} id="calendar-section">
              <div onClick={() => handleOpenSection("calendar-tab")}>
                <h4>
                  Tabs
                </h4>
                <ItemDocumentation show={openSection} id="tab">
                  <p>This is the description of the tabs</p>
                </ItemDocumentation>
              </div>
              <div onClick={() => handleOpenSection("calendar-month")}>
                <h4>
                  Month Overview (5 weeks)
                </h4>
                <ItemDocumentation show={openSection} id="month">
                  <p>This is the description of the weeks in the calendar.</p>
                </ItemDocumentation>
              </div>
              <div onClick={() => handleOpenSection("calendar-day")}>
                <h4>
                  Day Overview
                </h4>
                <ItemDocumentation show={openSection} id="day">
                  <p>This is the description for the day in the calendar</p>
                </ItemDocumentation>
              </div>
              <div onClick={() => handleOpenSection("calendar-addLog")}>
                <h4>
                  Adding a Log
                </h4>
                <ItemDocumentation show={openSection} id="addLog">
                  <p>This is the description for adding a log</p>
                </ItemDocumentation>
              </div>
              <div onClick={() => handleOpenSection("calendar-editLog")}>
                <h4>
                  Editting a Log
                </h4>
                <ItemDocumentation show={openSection} id="editLog">
                  <p>This is the description for editting a log.</p>
                </ItemDocumentation>
              </div>
              <div onClick={() => handleOpenSection("calendar-dayOverview")}>
                <h4>
                  Day Overview
                </h4>
                <ItemDocumentation show={openSection} id="dayOverview">
                  <p>This is the description of the day overview</p>
                </ItemDocumentation>
              </div>
            </List>
          </Section>
          <div className="spacer"/>
          <Section >
            <SectionTitle id="profile" onClick={() => handleOpenSection("profile")} isActive={openSection}>Profile</SectionTitle>
            <List show={openSection} id="profile-section">
              <div onClick={() => handleOpenSection("profile-banner")}>
                <h4>
                  Banner
                </h4>
                <ItemDocumentation show={openSection} id="banner">
                  <p>This is the description of the banner</p>
                </ItemDocumentation>
              </div>
              <div onClick={() => handleOpenSection("profile-goal")}>
                <h4>
                  Goal
                </h4>
                <ItemDocumentation show={openSection} id="goal">
                  <p>This is the description of the banner</p>
                </ItemDocumentation>
              </div>
              <div onClick={() => handleOpenSection("profile-chart")}>
                <h4>
                  Chart
                </h4>
                <ItemDocumentation show={openSection} id="chart">
                  <p>This is the description of the banner</p>
                </ItemDocumentation>
              </div>
              <div onClick={() => handleOpenSection("profile-addGoal")}>
                <h4>
                  Adding a goal
                </h4>
                <ItemDocumentation show={openSection} id="addGoal">
                  <p>This is the description of the banner</p>
                </ItemDocumentation>
              </div>
              <div onClick={() => handleOpenSection("profile-overview")}>
                <h4>
                  Overview
                </h4>
                <ItemDocumentation show={openSection} id="overview">
                  <p>This is the description of the banner</p>
                </ItemDocumentation>
              </div>
            </List>
          </Section>
          <div className="spacer"/>
          <Section>
            <SectionTitle id="about" onClick={() => handleOpenSection("about")} isActive={openSection}>About</SectionTitle>
            <List show={openSection} id="about-section">
              <div onClick={() => handleOpenSection("about-formulas")}>
                <h4>
                  Formulas
                </h4>
                <ItemDocumentation show={openSection} id="formulas">
                  <p>This is the description of the banner</p>
                </ItemDocumentation>
              </div>
              <div onClick={() => handleOpenSection("about-services")}>
                <h4>
                  Hosting and privacy
                </h4>
                <ItemDocumentation show={openSection} id="services">
                  <p>This is the description of the banner</p>
                </ItemDocumentation>
              </div>
              <div onClick={() => handleOpenSection("about-miguel")}>
                <h4>
                  Who I'm?
                </h4>
                <ItemDocumentation show={openSection} id="miguel">
                  <p>This is the description of the banner</p>
                </ItemDocumentation>
              </div>
            </List>
          </Section>
          <Footer>
            <marquee scrollamount="2">
              Made with  💟 Love 💟  in MA, USA.
              This is an <strong>Free Open Source Software</strong> project.
              Enjoy you life and accomplish your dreams, it's short and only one.
              <a href="mailto:journal@debloat.us">Contact me</a>.
            </marquee>
          </Footer>
        </Container>
    );
};

export default About;
