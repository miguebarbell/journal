import {BrowserRouter as Router, Routes, Route} from "react-router-dom";


import Navbar from "./components/navbar";
import Home from "./pages/home";
import Footer from "./components/footer";
import Day from "./pages/day";
import Login from "./pages/login";
import About from "./pages/about";
import Profile from "./pages/profile";
import Register from "./pages/register";
import {useSelector} from "react-redux";



function App() {

  const user = useSelector((state) => state.user.currentUser);

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/day" element={<Day/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
      {/*<Footer/>*/}
    </Router>
  );
}

export default App;
