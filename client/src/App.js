import {BrowserRouter as Router, Routes, Route} from "react-router-dom";


import Navbar from "./components/navbar";
import Home from "./pages/home";
// import Footer from "./components/footer";
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
        <Route exact path="/" element={user ? <Home/> : <Login/>}/>
        <Route path="/day" element={user ? <Day/> : <Login/>}/>
        <Route path="/login" element={user ? <Profile/> : <Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/profile" element={user ? <Profile/> : <Login/>}/>
      </Routes>
    </Router>
  );
}

export default App;
