import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import './App.css';
import Slide2 from './components/Slide2';
import Login from './components/Login';
import StudentRegister from './components/StudentRegister';
import Slide6 from './components/Slide6';
import TutorRegister from './components/TutorRegister';
import Forgotpass from './components/ForgotPassword';
import CreatePassword from './components/CreatePassword';
import Payment from './components/Payment';
import Admin from './components/Admin';
import Postsdash from './components/Postsdash';
import CreatePosts from './components/CreatePosts';
import Allposts from './components/Allposts';
import UserDashboard from './components/UserDashboard';
import { AuthProvider } from './components/authContext'; 
import ProtectedRoute from './components/ProtectedRoutes';
import EmailTemplate from './components/EmailTemplate';
// import NavigateEmailTemplate from './components/NavigateEmailTemplate';
import Edit from './components/Edit';

//import RegistrationEmail from './components/Registrationemail';


function AppContent() {
  const location = useLocation();
  const noHeaderPaths = ['/Email-Template', '/Edit'];
  
  return (
    <div className="App">
      {/* {/ {/ Conditionally render Header /} /} */}
      {!noHeaderPaths.includes(location.pathname) && <Header />}
      <div className="content">
        <Routes></Routes>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path='/about-us' element={<Slide2 />} />
              <Route path='/login' element={<Login />} />
              <Route path='/forgotpassword' element={<Forgotpass />} />
              <Route path='/register/student' element={<StudentRegister />} />
              <Route path='/create-password' element={<CreatePassword />} />
              <Route path='/register/term' element={<Slide6 />} />
              <Route path='/register/tutor' element={<TutorRegister />} /> 
             
              <Route path='/posts' element= {
                <ProtectedRoute>
                  <Admin />
                 </ProtectedRoute>
              }   
                />
                              
              <Route path='/Email-Template' element={<EmailTemplate/>}/>
              <Route path='/Edit' element={<Edit/>}/>

              <Route path='/postsdash' element={<Postsdash />} />
              <Route path='/dashboard' element={<CreatePosts />} />
              <Route path='/allposts' element={<Allposts />} />
              <Route path='/payment'element={<Payment/>}></Route>
              <Route
                path='/userDashboard' 
                element={
                  <ProtectedRoute>
                    <UserDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </div>
    
  );
}

function App(){
  return(
    <AuthProvider>
      <Router>
        <AppContent/>
      </Router>
    </AuthProvider>
  )
}

export default App;
 