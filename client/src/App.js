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
import Loading from "./components/loading";



function App() {

  const user = useSelector((state) => state.user);

  return (
    <Router>
      {user.isFetching && <Loading/>}
      <Navbar/>
      <Routes>
        <Route exact path="/" element={user.currentUser ? <Home/> : <Login/>}/>
        <Route path="/demo" element={user.currentUser.email === 'demo@debloat.us' ? <Profile/> : <Login user={'demo'}/>}/>
        <Route path="/day" element={user.currentUser ? <Day/> : <Login/>}/>
        <Route path="/login" element={user.currentUser ? <Profile/> : <Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/profile" element={user.currentUser ? <Profile/> : <Login/>}/>
      </Routes>
    </Router>
  );
}

export default App;
