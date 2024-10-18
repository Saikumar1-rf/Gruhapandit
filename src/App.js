import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import "./App.css";
import Slide2 from "./components/Slide2";
import Login from "./components/Login";
import StudentRegister from "./components/StudentRegister";
import Slide6 from "./components/Slide6";
import TutorRegister from "./components/TutorRegister";
import Forgotpass from "./components/ForgotPassword";
import CreatePassword from "./components/CreatePassword";
import Admin from "./components/Admin";
import Postsdash from "./components/Postsdash";
import CreatePosts from "./components/CreatePosts";
import Allposts from "./components/Allposts";
import Payment from "./components/Payment";
import UserDashboard from "./components/UserDashboard";
// import { AuthProvider } from './components/authContext';
// import ProtectedRoute from './components/ProtectedRoutes';

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Header /> */}
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<Slide2 />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgotpassword" element={<Forgotpass />} />
            <Route path="/register/student" element={<StudentRegister />} />
            <Route path="/create-password" element={<CreatePassword />} />
            <Route path="/register/term" element={<Slide6 />} />
            <Route path="/register/tutor" element={<TutorRegister />} />
            <Route path="/posts" element={<Admin />} />
            <Route path="/postsdash" element={<Postsdash />} />
            <Route path="/dashboard" element={<CreatePosts />} />
            <Route path="/allposts" element={<Allposts />} />
            <Route path="/payment" element={<Payment />} />

            <Route path="/userDashboard" element={<UserDashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
