// src/components/ErrorBoundary.jsx
import { useState, useEffect } from "react";

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = (error, errorInfo) => {
      console.error("Error caught by ErrorBoundary:", error, errorInfo);
      setHasError(true);
    };

    window.addEventListener("error", handleError);

    return () => {
      window.removeEventListener("error", handleError);
    };
  }, []);

  if (hasError) {
    return (
      <div>
        <h2>Something went wrong.</h2>
        <p>Please try again later or refresh the page.</p>
        <button onClick={() => window.location.reload()}>Reload Page</button>
      </div>
    );
  }
  return children;
};

export default ErrorBoundary;