import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import LandingPage from "./Compnents/LandingPage.jsx";

import Dashboard from "./Compnents/Dashboard/Dashboard.jsx"; // Import your other pages
import AboutUs from "./Compnents/AboutUs.jsx";
import QuizAnalytics from "./Compnents/Dashboard/QuizAnalytics.jsx";

// Import your other pages
import SignUpPage from "./Compnents/Auth/SignUpPage.jsx";

import LoginPage from "./Compnents/Auth/LoginPage.jsx";
import { ErrorNotification, SuccessNotification, WarningNotification } from "./Compnents/ui/NotificationComponents .jsx";
import { ThemeContext } from "./Context/ThemeContext.jsx";
import { useContext, useEffect } from "react";
import UserTypeSelection from "./Compnents/Auth/UserTypeSelection.jsx";
import Nav from "./Compnents/Nav.jsx";
import Footer from "./Compnents/Footer.jsx";
import { useAuth } from "./Context/AuthContext.js";

// import Login from "./Compnents";

function App() {
  
  const {  theme,setTheme,successMsg, setSuccessMsg,WarningMsg, setwarninigsg,errMsg, seterrMsg} =useContext(ThemeContext);
  return (
    <BrowserRouter>
    <Nav />
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/quiz-analysis" element={<QuizAnalytics />} />
      <Route path="/select-role" element={<UserTypeSelection />} />
    </Routes>
    <Footer />
    {/* Notifications */}
    {theme === "success" && successMsg && (
        <SuccessNotification message={successMsg} position="top-right" />
      )}
      {theme === "warning" && WarningMsg && (
        <WarningNotification message={WarningMsg} position="top-right" />
      )}
      {theme === "error" && errMsg && (
        <ErrorNotification message={errMsg} position="bottom-right" />
      )}
  </BrowserRouter>
  
  );
}

export default App;