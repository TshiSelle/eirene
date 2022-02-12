import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from "./components/Profile/SignUp/SignUpPage";
import HomePage from "./components/HomePage";
import LoginPage from "./components/Profile/SignIn/LoginPage";
import ForgotPasswordForm from "./components/Profile/SignIn/forgot/ForgotPasswordForm";
import FullPageSpinner from "./components/spinner/FullPageSpinner";

const App = () => {
  return (
    <Suspense fallback={<FullPageSpinner />}>
      {/* This is where we will have to put the top navigation bar */}
      <Suspense fallback={<FullPageSpinner />}>
        <Router>
          <Routes>
            {/* Every page we create needs to have a route so we can navigate to it,
                Imitate the routes below with a proper path when adding a new page */}
            <Route path="/" element={<HomePage />} />
            <Route path="/SignUp" element={<SignUpPage />} />
            <Route path="/SignIn" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordForm />} />
          </Routes>
        </Router>
      </Suspense>
      {/* This is where we will have to put Footer (IF IT EXISTS)*/}
    </Suspense>
  );
};

export default App;
