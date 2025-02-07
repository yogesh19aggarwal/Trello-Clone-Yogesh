import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  const navigate = useNavigate();

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
      <Card className="w-full max-w-md mx-auto mt-10 p-4 shadow-lg flex flex-col items-center">
        <CardContent className="flex flex-col items-center text-center">

          <Typography variant="h5" className="font-semibold text-red-600">
            Something went wrong.
          </Typography>

          <Typography variant="body1" className="mt-2">
            Please try again later or refresh the page.
          </Typography>

          <Button
            variant="contained"
            color="primary"
            className="mt-4"
            onClick={() => navigate('/boards')}
          >
            Reload Page
          </Button>
        </CardContent>
      </Card>
    );
  }

  return children;
};

export default ErrorBoundary;
