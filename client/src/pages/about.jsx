// external
import styled, {keyframes} from "styled-components";
import {useState} from "react";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import InfoIcon from '@mui/icons-material/Info';
// internal
import hl from '../assets/hl.png'
import ul from '../assets/underline.png'
import img from '../bg/so-you-wanna-be-an-mma-fighter.jpg';
import imageBanner from '../assets/about/profile/banner.png';
import imageGoal from '../assets/about/profile/deadliftgoal.png';
import imageChartAccu from '../assets/about/profile/accugraph.png';
import imageChartTest from '../assets/about/profile/testgraph.png';
import imageAddGoal from '../assets/about/profile/addgoal.png';
import imageGoalOverview30 from '../assets/about/profile/last30.png'
import imageGoalOverviewAll from '../assets/about/profile/alldays.png'
import imageGoalOverview5 from '../assets/about/profile/last5.png'

// conf
import {COLOR_FOUR, COLOR_ONE, COLOR_THREE, COLOR_TWO, PRIMARY, SECONDARY} from "../conf";


// TODO: make a span with class highlight, and make it fun, like with a real highlight.

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
  justify-content: flex-start;
  min-width: 100vw;
  min-height: calc(100vh - 6.2rem);
  //height: 50rem;
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
  display: flex;
  flex-direction: column;
  //justify-content: flex-start;
  transition: all ease-in-out 1s;
  width: 100vw;
  color: ${ COLOR_FOUR };
  //height: 4.5rem;
  //height: 0;
  flex: 0;
  &#calendar {
       height: ${({animate}) => (animate.includes('calendar')) && 'auto'};
      flex: ${({animate}) => (animate.includes('calendar')) && 1};
  }
  &#profile {
    height: ${({animate}) => (animate.includes('profile')) && 'auto'};
    flex: ${({animate}) => (animate.includes('profile')) && 1};
  }
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
  bottom: 0;
  flex: 0;
  width: 100%;
  background-color: ${COLOR_TWO};
  color: ${ COLOR_FOUR };
  padding: 1em 0.5rem;
  margin: 0;
  marquee {
    font-weight: bold;
    overflow: hidden;
  }
`;
const slideFromRight = keyframes`
  0% {
    margin-left: 100%;
    width: 300%;
  }
  50% {
    margin-left: 5%;
    width: 100%;
  }
  100% {
    margin-left: 0;
    width: 100%;
  }
`;
const ItemDocumentation = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${COLOR_THREE};
  color: ${COLOR_TWO};
  box-shadow: inset 0 0 4px ${COLOR_ONE};
  margin: 1rem 0;
  padding: 0 1rem;
  flex: 0;
  animation: ${slideFromRight} 1s linear;
  &#banner {
    display: ${({show}) => show === 'profile-banner' ? 'flex' : 'none'};
    flex: 1;
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
  p > span{
    &.highlight {
      background-image: url(${hl});
      white-space: pre;
    }
    &.underline {
      background-image: url(${ul});
      white-space: pre;
    }
    &:before,
    &:after {
      content: "  ";
    }
    font-weight: bold;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  p > a {
    color: ${SECONDARY};
  }
`;
const List = styled.div`
  padding: 0 3rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: ${COLOR_TWO};
  overflow: hidden;
  div h4 {
    cursor: pointer;
    margin: 0.5rem 0;
    animation: ${blurAnimation} 1.2s linear;
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
  padding: 1rem 2rem;
  margin: 0;
  animation: ${blurAnimation} 0.5s linear;
  background-color: ${COLOR_TWO};
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
const MainContainer = styled.div`
  overflow-x: hidden;
`;
const Image = styled.img`
  max-width: 60%;
  max-height: 50%;

  border-radius: 5px;
  box-shadow: 0 0 10px ${COLOR_TWO}; 
  margin: 1rem auto;
  &.multiple {
    width: 30%;
  }
  @media only screen and (max-width: 820px) {
    max-width: 90%;
    &.multiple {
      width: 200px;
    }
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
      <MainContainer>
        <Container bg={img}>
          <Section animate={openSection} id="calendar">
            <SectionTitle id="calendar" onClick={() => handleOpenSection("calendar")} isActive={openSection}>
              <FitnessCenterIcon/>
              &nbsp;Calendar</SectionTitle>
            <List show={openSection} id="calendar-section">
              <div>
                <h4 onClick={() => handleOpenSection("calendar-tab")}>
                  Tabs
                </h4>
                <ItemDocumentation show={openSection} id="tab">
                  <p>This is the description of the tabs</p>
									<p>Every tab represents a goal, having a general one to review all the activities, and every specific other tab to review the logs for that specific goal.</p>
                </ItemDocumentation>
              </div>
              <div>
                <h4 onClick={() => handleOpenSection("calendar-month")}>
                  Month Overview (5 weeks)
                </h4>
                <ItemDocumentation show={openSection} id="month">
                  <p>This is the description of the weeks in the calendar.</p>
									<p>It will have always 4 weeks for review, starting with monday, and the 5 week, it's the present week.</p>
									<p>No you can't add logs in the future, by design, you already had to do the job towards the accomplishment of your goal.</p>
									<p>The present day (today), will always the last day in the calendar, also is in other color (yellowish kind).</p>
									<p>The first day in the calendar will tell you the month on that day, with the first three letters of that month, in a purple color. Also if the month changes it will print the new month in that day in particular (1st day of the month).</p>
									<p>The yellow number at the upper right, means the number of the day in the current month.</p>
                </ItemDocumentation>
              </div>
              <div>
                <h4 onClick={() => handleOpenSection("calendar-day")}>
                  Day Overview
                </h4>
                <ItemDocumentation show={openSection} id="day">
                  <p>In every day, you have the possibility of adding a log, only if the day is in the range (timeframe) of that specific goal, by pressing the plus icon.</p>
									<p>Also you have the possibility of review the day if you have any log in that day, by pressing the lens icon.</p>
                </ItemDocumentation>
              </div>
              <div>
                <h4 onClick={() => handleOpenSection("calendar-addLog")}>
                  Adding a Log
                </h4>
                <ItemDocumentation show={openSection} id="addLog">
                  <p>This is the description for adding a log</p>
                </ItemDocumentation>
              </div>
              <div>
                <h4 onClick={() => handleOpenSection("calendar-editLog")}>
                  Editing a Log
                </h4>
                <ItemDocumentation show={openSection} id="editLog">
                  <p>This is the description for editing a log.</p>
                </ItemDocumentation>
              </div>
              <div>
                <h4 onClick={() => handleOpenSection("calendar-dayOverview")}>
                  Day Overview
                </h4>
                <ItemDocumentation show={openSection} id="dayOverview">
                  <p>This is the description of the day overview</p>
                </ItemDocumentation>
              </div>
            </List>
          </Section>
          {/*<div className="spacer"/>*/}
          <Section animate={openSection} id="profile">
            <SectionTitle id="profile" onClick={() => handleOpenSection("profile")} isActive={openSection}>
              <AccountBoxIcon/>&nbsp;Profile</SectionTitle>
            <List show={openSection} id="profile-section">
              <div>
                <h4 onClick={() => handleOpenSection("profile-banner")}>
                  Banner
                </h4>
                <ItemDocumentation show={openSection} id="banner">
                  <Image src={imageBanner} alt="Banner"/>
                  <p>The image is an <span className="highlight">avatar of a robot</span>, randomly generated from <a href="https://avatars.dicebear.com">dice bear</a> API, it uses your email as a parameter for an <span className="highlight">unique picture</span>.</p>
                  <p>Also generate a <span className="highlight">motivational quote</span> from famous people, it's refresh everything you render the page.</p>
                </ItemDocumentation>
              </div>
              <div>
                <h4 onClick={() => handleOpenSection("profile-goal")}>
                  Goal
                </h4>
                <ItemDocumentation show={openSection} id="goal">
                  <Image src={imageGoal} alt="Deadlift goal"/>

                  <p>Explaining the element by example:</p>
                  <p><span className="highlight">Target Goal</span> (Deadlift): The exercise or activity you choose to beat.</p>
                  <p><span className="highlight">Days left</span> (30 days left): This show the days left to accomplish the goal, self explanatory.</p>
                  <p> <span className="highlight">Time left in weeks</span> (in 4 weeks 2 days): This show a different view of the time left to accomplish your goal.</p>
                  <p><span className="highlight">The strain</span> (200kgs): This is the weight/distance/times that you set your goal, this is the target to beat!.</p>
                  <p> <span className="highlight"> The medal</span> (🏅): This doesn't do anything, is just for motivational propose, to remind you are the number one.</p>
                </ItemDocumentation>
              </div>
              <div>
                <h4 onClick={() => handleOpenSection("profile-chart")}>
                  Chart
                </h4>
                <ItemDocumentation show={openSection} id="chart">
                  <p><span className="highlight">Type of goal</span> (accu / test): This is the modality of the goal, this case, will display the 3 different things:</p>
                  <p><span className="highlight">Goal - Red:</span> This is the goal to beat!.</p>

                  <Image src={imageChartAccu} alt="Chart of a accumulation goal"/>
                  <p><span className="highlight">Accumulated - Blue:</span> This is the accumulated volume of all the timeframe you set your goal, that means is the sum of all the logs strain * reps * sets.</p>
                  <p><span className="highlight">Volume per day - Light Blue:</span> This is the volume done in the specific day.</p>

                  <Image src={imageChartTest} alt="Chart of a test goal"/>
                  <p><span className="highlight">Max Abs Int/day - Blue:</span> This take the set with the highest strain and put it.</p>
                  <p><span className="highlight">Max Rel Int/day -  Light Blue:</span> This calculate with the Epsley formula, the relative intensity or one rep maximum, Formula is = <span className="highlight">weight * (1 + repetitions/30)</span>.</p>
                </ItemDocumentation>
              </div>
              <div>
                <h4 onClick={() => handleOpenSection("profile-addGoal")}>
                  Adding a goal
                </h4>
                <ItemDocumentation show={openSection} id="addGoal">
                  <Image src={imageAddGoal} alt="Adding a goal form"/>
                  <p><span className="highlight">Movement</span>: Whatever you want to track, if you are doing an unique movement on the gym, or just want to track the time on some task, or the times you go out with your dog, this is where you put it, try to use a <span className="highlight">concise word</span> for this propose.</p>
                  <p><span className="highlight">Quantity</span>: Use a <span className="highlight">realistic, yet challenge number</span>, why a number? numbers can be calculated.</p>
                  <p><span className="highlight">Unit</span>: You can select from <span className="highlight">kilos, pounds, meters, feet or times</span> if you need another unit for your specific goal, send me an email, easy.</p>
                  <p><span className="highlight">Plan</span>: You can select from <span className="highlight">Max Attempt, Accumulate or Every Day</span> if you need another unit for your specific goal, send me an email, easy.</p>
                  <p><span className="highlight">Days</span>: Quantity of days you want to beat you goal, this is the first part of the "timeframe" of your goal.</p>
                  <p><span className="highlight">Start</span>: The date where you want to start your goal, from this day this app will read the logs for this specific goal, this is the second part of the "timeframe" of your goal.</p>
                  <p><span className="highlight">Notes</span>: This is where you can write the why of your goal; try to write <span className="highlight">   something motivating</span> so it will refill your will in hard days.</p>
                </ItemDocumentation>
              </div>
              <div>
                <h4 onClick={() => handleOpenSection("profile-overview")}>
                  Overview
                </h4>
                <ItemDocumentation show={openSection} id="overview">
                  <p>You can <span className="highlight">dynamically change</span> the overview days, this don't change the information displayed in the chart.</p>
                  <Image className="multiple" src={imageGoalOverview30} alt="Overview of the last 30 days"/>
                  <Image className="multiple" src={imageGoalOverview5} alt="Overview of the last 5 days"/>
                  <Image className="multiple" src={imageGoalOverviewAll} alt="Overview of all days"/>
                  <p>If you change the time to <span className="highlight">number 0</span> it will review all logs.</p>
                </ItemDocumentation>
              </div>
            </List>
          </Section>
          {/*<div className="spacer"/>*/}
          <Section animate={openSection} id="about">
            <SectionTitle id="about" onClick={() => handleOpenSection("about")} isActive={openSection}>
              <InfoIcon/>&nbsp;About</SectionTitle>
            <List show={openSection} id="about-section">
              <div>
                <h4 onClick={() => handleOpenSection("about-formulas")}>
                  Formulas
                </h4>
                <ItemDocumentation show={openSection} id="formulas">

									<p>Relative intensity of a set is the expression in weight (strain) for a specific working set, in example, if you do 5 repetition of a dead-lift at 100 kilos, the absolute intensity for that specific working set is 100 kilos, but the relative one is higher, because you did 5 repetitions, makes sense?</p>
                  <p>For taking the relative intensity of a specific set, it use the <span className="underline">Epley formula.</span></p>
									<p>strain + (repetitions * (strain / 30 )) => 100 kilos + (5 repetitions * (100 kilos / 30)) => 116.6 kilos.</p>
                  <p>Disclaimer: Relative Intensity (RelInt) <span className="underline">doesn't substitute the Absolute Intensity (AbsInt),</span> it a way to see the strain in the movement, if you want to make a Personal Record (PR), you should do it in the specific range on repetitions (usually 1). But it helps for preparing the body and the mind for the test, because if the case of dead-lifting 5 times at 100 kilos, for sure you can make 1 repetition at 116 kilos</p>

                </ItemDocumentation>
              </div>
              <div>
                <h4 onClick={() => handleOpenSection("about-services")}>
                  Hosting and privacy
                </h4>
                <ItemDocumentation show={openSection} id="services">
                  <p>For this project I used a MongoDB Expressjs Reactjs Nodejs (M.E.R.N.) stack</p>
									<p>The front-end is hosted in a free S3 bucket provided by Amazon Web Services (AWS), and the backend is in a free dyno at Heroku.</p>
									<p>All the requests are validated with a token (JWT) in the server.</p>
									<p>The code of this projects is free to reproduce, or fork, or analyze! <a href="https://github.com/miguebarbell/journal/">at GitHub</a> or <a href="https://gitlab.com/redmike/journal/">GitLab</a> (prefer GitLab).</p>
                </ItemDocumentation>
              </div>
              <div>
                <h4 onClick={() => handleOpenSection("about-miguel")}>
                  Who I'm?
                </h4>
                <ItemDocumentation show={openSection} id="miguel">
                  <p>Hi, it's me!<span className="highlight">Miguel</span></p>
                  <p>Please, <span className="underline">feel free to reach me out</span> asking for a feature or reporting a bug o malfunction (shame on me!), or just to say Hi!.</p>
									<p>You can always check for more at my webpage (it was my first one and I keep it kind of the same), or just for checkout my dog.</p>
									<p>This project came to solve my problem of log the workouts for a specific goal. You should always work on a measurable goal, or find an indirect way to measure it.</p>
                </ItemDocumentation>
              </div>
            </List>
          </Section>
        </Container>
        <Footer>
          <marquee scrollamount="2">
          Made with  💟 Love 💟  in MA, USA.
          This is an <strong>Free Open Source Software</strong> project.
          Enjoy you life and accomplish your dreams, it's short and only one.
          <a href="mailto:journal@debloat.us">Contact me</a>.
        </marquee>
        </Footer>
</MainContainer>
    );
};

export default About;
