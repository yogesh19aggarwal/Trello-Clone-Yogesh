import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BoardPage from "./pages/BoardPage";
import NotFound from "./pages/NotFound";
import MainLayout from "./layouts/MainLayout";
import ErrorBoundary from "./errorBoundary/ErrorBoundary";
import SignIn from "./components/auth/SignIn";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("isAuthenticated") === "true"
  );

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/boards" replace /> : <Navigate to="/signin" replace />} />
        <Route path="/signin" element={<SignIn setIsAuthenticated={setIsAuthenticated} />} />

        {isAuthenticated && (
          <Route path="/" element={<MainLayout setIsAuthenticated={setIsAuthenticated} />}>
            <Route path="/boards" element={<ErrorBoundary><HomePage /></ErrorBoundary>} />
            <Route path="/boards/:boardId" element={<ErrorBoundary><BoardPage /></ErrorBoundary>} />
          </Route>
        )}

        <Route path="*" element={<ErrorBoundary><NotFound /></ErrorBoundary>} />
      </Routes>
    </ErrorBoundary>
  );
};

export default App;
