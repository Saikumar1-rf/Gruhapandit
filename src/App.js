import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
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
import Payment from "./components/Payment";
import Admin from "./components/Admin";
import Postsdash from "./components/Postsdash";
import CreatePosts from "./components/CreatePosts";
import Allposts from "./components/Allposts";
import UserDashboard from "./components/UserDashboard";
import { AuthProvider } from "./components/authContext";
import ProtectedRoute from "./components/ProtectedRoutes";
import Sidebar from "./components/Sidebar";
import DialogueBox from "./components/DialogueBox";
import Gallery from "./components/Gallery";
import Slide7 from "./components/Slide7";
// import DialogueBox2 from './components/DialogueBox2';
// import Subscription from './components/Subscriptions';
// import CreatePlans from'./components/CreatePlans'
import AllEmailTemplatesPage from "./pages/EmailTemplates/AllEmailTemplatesPage";
import EditEmailTemplatePage from "./pages/EmailTemplates/EditEmailTemplatePage";

function AppContent() {
  const location = useLocation();
  const noHeaderPaths = [
    "/userDashboard",
    "/posts",
    "/allposts",
    "/dashboard",
    "/gallery",
    "/subscription",
    "/email-templates",
  ];

  return (
    <div className="App">
      {!noHeaderPaths.includes(location.pathname) &&
        !location.pathname.startsWith("/edit-email-template") && <Header />}
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<Slide2 />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<Forgotpass />} />
          <Route path="/register/student" element={<StudentRegister />} />
          <Route path="/create-password" element={<CreatePassword />} />
          <Route path="/register/term" element={<Slide6 />} />
          <Route path="/slide7" element={<Slide7 />}></Route>
          {/* <Route path="/subscription"element={<Subscription/>}></Route> */}
          <Route path="/dialoguebox" element={<DialogueBox />}></Route>
          {/* <Route path="/dialoguebox2" element={<DialogueBox2/>}></Route> */}
          {/* <Route path="/createplans" element={<CreatePlans/>}></Route> */}
          <Route path="/register/tutor" element={<TutorRegister />} />
          <Route
            path="/posts"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route path="/postsdash" element={<Postsdash />} />
          <Route path="/slide6" element={<Slide6 />} />
          <Route path="sidebar" element={<Sidebar />} />
          <Route path="/gallery" element={<Gallery />}></Route>
          <Route path="/dashboard" element={<CreatePosts />} />
          <Route path="/allposts" element={<Allposts />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/userDashboard" element={<UserDashboard />} />
          <Route path="/email-templates" element={<AllEmailTemplatesPage />} />
          <Route
            path="/edit-email-template/:templateId"
            element={<EditEmailTemplatePage />}
          />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
