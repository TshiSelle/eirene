import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpPage from "./components/Profile/SignUp/SignUpPage";
import HomePage from "./components/HomePage";
import LoginPage from './components/Profile/SignIn/LoginPage';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Every page we create needs to have a route so we can navigate to it,
          Imitate the routes below with a proper path when adding a new page */}
          <Route path='/' element={<HomePage />} />
          <Route path='/SignUp' element={<SignUpPage />} />
          <Route path='/SignIn' element={<LoginPage />} />
      </Routes>
    </Router>
  
  );
};

export default App;
