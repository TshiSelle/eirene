import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from "./components/Profile/SignUp/SignUpPage";
import HomePage from "./components/HomePage/HomePage";
import LoginPage from "./components/Profile/SignIn/LoginPage";
import ProfilePage from "./components/Profile/UserProfile/ProfilePage";
import ForgotPasswordForm from "./components/Profile/SignIn/forgot/ForgotPasswordForm";
import FullPageSpinner from "./components/spinner/FullPageSpinner";
import Journal from "./components/Journal/Journal";
import ForgotPasswordResetForm from './components/Profile/SignIn/forgot/ForgotPasswordResetForm';
import SearchTherapists from "./components/Therapists/SearchTherapists";
import TherapistDescription from './components/Therapists/TherapistDescription';
import { AuthProvider } from "./context/AuthContext";
import NavBar from "./components/HomePage/NavBar";
import SiteFooter from "./components/HomePage/Footer";
import { JournalProvider } from "./context/JournalContext";
import MeditationPage from "./components/Meditations/MeditationPage";
import VerifyAccount from "./components/Profile/SignUp/verify/VerifyAccount";
import { UserProvider } from "./context/UserContext";
import { CalendarProvider } from './context/CalendarContext';
import MediaPlayer from "./components/MediaPlayer/MediaPlayer";
import { CloudinaryContext } from "cloudinary-react";
import ContactUsRoute from "./components/ContactUs/ContactUsRoute";
import NotFoundRoute from "./components/NotFound/NotFoundRoute";


const App = () => {
  return (
  
  <CloudinaryContext cloudName="cloudloom">
    <AuthProvider>
      <UserProvider>
        <CalendarProvider>
          <JournalProvider>
            <Suspense fallback={<FullPageSpinner />}>
              <Suspense fallback={<FullPageSpinner />}>
                <Router>
                  <NavBar />
                  <MediaPlayer>
                    <Routes>
                      {/* Every page we create needs to have a route so we can navigate to it,
                            Imitate the routes below with a proper path when adding a new page */}
                      <Route path="/" element={<HomePage />} />
                      <Route path="/Profile" element={<ProfilePage />} />
                      <Route path="/SignUp" element={<SignUpPage />} />
                      <Route path="/SignIn" element={<LoginPage />} />
                      <Route path="/forgot-password" element={<ForgotPasswordForm />} />
                      <Route path="/forgot-password/:username/:token" element={<ForgotPasswordResetForm />} />
                      <Route path="/find-therapists" element={<SearchTherapists />} />
                      <Route path="/Meditations" element={<MeditationPage />} />
                      <Route path="/therapist-description/:id" element={<TherapistDescription />} />
                      <Route path="/verify/:username/:token" element={<VerifyAccount />} />
                      <Route path="/Journal" element={<Journal />} />
                      <Route path="/contact" element={<ContactUsRoute />} />
                      <Route path="*" element={<NotFoundRoute />} />
                    </Routes>
                  </MediaPlayer>
                  <SiteFooter />
                </Router>
              </Suspense>
            </Suspense>
          </JournalProvider>
        </CalendarProvider>
      </UserProvider>
    </AuthProvider>
  </CloudinaryContext>
  );
};

export default App;
