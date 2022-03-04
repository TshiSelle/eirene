import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from "./components/Profile/SignUp/SignUpPage";
import HomePage from "./components/HomePage";
import LoginPage from "./components/Profile/SignIn/LoginPage";
import ForgotPasswordForm from "./components/Profile/SignIn/forgot/ForgotPasswordForm";
import FullPageSpinner from "./components/spinner/FullPageSpinner";
import ForgotPasswordResetForm from './components/Profile/SignIn/forgot/ForgotPasswordResetForm';
import SearchTherapists from "./components/Therapists/SearchTherapists";
import TherapistDescription from './components/Therapists/TherapistDescription';
import { AuthProvider } from "./context/AuthContext";
import VerifyAccount from "./components/Profile/SignUp/verify/VerifyAccount";
import { UserProvider } from "./context/UserContext";

const App = () => {
  return (
    <AuthProvider>
      <UserProvider>
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
                <Route path="/forgot-password/:username/:token" element={<ForgotPasswordResetForm />} />
                <Route path="/find-therapists" element={<SearchTherapists />} />
                <Route path="/therapist-description/:id" element={<TherapistDescription />} />
                <Route path="/verify/:username/:token" element={<VerifyAccount />} />
              </Routes>
            </Router>
          </Suspense>
          {/* This is where we will have to put Footer (IF IT EXISTS)*/}
        </Suspense>
      </UserProvider>
    </AuthProvider>
  );
};

export default App;
