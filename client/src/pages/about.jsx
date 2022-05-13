import styled, {keyframes} from "styled-components";
import {COLOR_FIVE, COLOR_FOUR, COLOR_ONE, COLOR_THREE, COLOR_TWO, PRIMARY, SECONDARY} from "../conf";
import img from '../bg/so-you-wanna-be-an-mma-fighter.jpg';
import {useState} from "react";

// TODO: make a span with class highlight, and make it fun, like with a real highlight.

const appearAnimation = keyframes`
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
`;
const disappearAnimation = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0);
  }
`;
const blurAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 100vw;
  min-height: 100vh;
  background-image: linear-gradient(to bottom, ${PRIMARY + "50"}, ${SECONDARY + "50"}), url(${({bg}) => bg});
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
  transition: all 3s ease-in-out;
  animation: ${blurAnimation} 1.5s linear;

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
  animation: ${blurAnimation} 1s linear;

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
									<p>Every tab represents a goal, having a general one to review all the activities, and every specific other tatb to review the logs for that specific goal.</p>
                </ItemDocumentation>
              </div>
              <div onClick={() => handleOpenSection("calendar-month")}>
                <h4>
                  Month Overview (5 weeks)
                </h4>
                <ItemDocumentation show={openSection} id="month">
                  <p>This is the description of the weeks in the calendar.</p>
									<p>It will have always 4 weeks for review, starting with monday, and the 5 week, it's the present week.</p>
									<p>No you can't add logs in the future, by design, you already had to do the job towards the accomplishent of your goal.</p>
									<p>The present day (today), will always the last day in the calendar, also is in other color (yelowish kind).</p>
									<p>The first day in the calendar will tell you the month on that day, qith the first three letters of that month, in a purple color. Also if the month changesit will print the new month in that day in particular (1st day of the month).</p>
									<p>The yellow number at the upper right, means the number of the day in the current month.</p>
                </ItemDocumentation>
              </div>
              <div onClick={() => handleOpenSection("calendar-day")}>
                <h4>
                  Day Overview
                </h4>
                <ItemDocumentation show={openSection} id="day">
                  <p>In every day, you have the posibility of adding a log, only if the day is in the range (timeframe) of that specific goal, by pressing the plus icon.</p>
									<p>Also you have the posibility of review the day if you have any log in that day, by pressing the lens icon.</p>
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

									<p>Relative intensity of a set is the expression in weight (strain) for a specific working set, in example, if you do 5 repetition of a deadlift at 100 kilos, the absolute intensity for that specific working set is 100 kilos, but the relative one is higher, because you did 5 repetitios, makes sense?</p>
                  <p>For taking the relative intensity of a specific set, it use the Epley formula.</p>
									<p>strain + (repetitions * (strain / 30 )) => 100 kilos + (5 repetitios * (100 kilos / 30)) => 116.6 kilos.</p>
									<p>Disclaimer: Relative Intensity (RelInt) doesn't subsitute the Absolute Intensity (AbsInt), it a way to see the strain in the movement, if you want to make a Personal Record (PR), you should do it in the specific range on repetitios (usually 1). But it helps for preparing the body and the mind for the test, because if the case of deadlifting 5 times at 100 kilos, for sure you can make 1 repetition at 116 kilos</p>

                </ItemDocumentation>
              </div>
              <div onClick={() => handleOpenSection("about-services")}>
                <h4>
                  Hosting and privacy
                </h4>
                <ItemDocumentation show={openSection} id="services">
                  <p>For this project I used a MongoDB Expressjs Reactjs Nosejs (M.E.R.N.) stack</p>
									<p>The front-end is hosted in a free S3 bucket provided by Amazon Web Services (AWS), and the backend is in a free dyno at Heroku.</p>
                  <p>All the requests are validated with a token (JWT) in the server.</p>
                  <p>The code of this projects is free to reproduce, or fork, or analize! <a
                    href="https://github.com/miguebarbell/journal/">at GitHub</a> or <a
                    href="https://gitlab.com/redmike/journal/">GitLab</a> (prefer GitLab).</p>
                </ItemDocumentation>
              </div>
              <div onClick={() => handleOpenSection("about-miguel")}>
                <h4>
                  Who I'm?
                </h4>
                <ItemDocumentation show={openSection} id="miguel">
                  <p>Hi, it's me!<span className="highlight">Miguel</span></p>
									<p>Please, feel free to reach me out asking for a feature or reporting a bug o malfunction (shame on me!), or just to say Hi!.</p>
                  <p>You can always check for more at my webpage (it was my first one and I keep it kind of the same),
                    or just for checkout my dog.</p>
                  <p>This project came to solve my problem of log the workouts for a specific goal. You should always
                    work on a messuarable goal, or find an indirect way to meassure it.</p>
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
