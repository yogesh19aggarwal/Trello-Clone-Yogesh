import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BoardPage from "./pages/BoardPage";
import NotFound from "./pages/NotFound";
import MainLayout from "./layouts/MainLayout";
import ErrorBoundary from "./errorBoundary/ErrorBoundary";

const App = () => {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Navigate to="/boards" replace />} />

        <Route path="/" element={<MainLayout />}>
          <Route path="/boards" element={<ErrorBoundary><HomePage/></ErrorBoundary>} />
          <Route path="boards/:boardId" element={<ErrorBoundary><BoardPage/></ErrorBoundary>} />
          <Route path="*" element={<ErrorBoundary><NotFound/></ErrorBoundary>} />
        </Route>

      </Routes>
    </ErrorBoundary>
  );
};

export default App;
