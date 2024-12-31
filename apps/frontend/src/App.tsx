import React from "react";

import { Routes, Route } from "react-router";
import { useAuth } from "./hooks/useAuth";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/DashboardPage";
import NotFoundPage from "./pages/NotFoundPage";
import PhishingAttemptCreatePage from "./pages/PhishingAttemptCreatePage";
import Header from "./components/Header";
import VerifyEmail from "./pages/VerifyEmail";
import ResetPassword from "./pages/ResetPasswordPage";
import ForgotPassword from "./pages/ForgotPasswordPage";

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Header />
      {!isAuthenticated ? (
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify-email/:token" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/create-attempt"
            element={<PhishingAttemptCreatePage />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      )}
    </>
  );
};

export default App;
