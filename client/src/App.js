import {BrowserRouter as Router, Routes, Route} from "react-router-dom";


import Navbar from "./components/navbar";
import Home from "./pages/home";
import Footer from "./components/footer";
import Day from "./pages/day";
import Login from "./pages/login";



function App() {

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/day" element={<Day/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
