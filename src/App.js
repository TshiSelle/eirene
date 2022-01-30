import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpPage from "./components/SignUp/SignUp";
import HomePage from "./components/HomePage";

const App = () => {
  return (
    <Router>
      <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/SignUp' element={<SignUpPage />} />
      </Routes>
    </Router>
  
  );
};

export default App;
