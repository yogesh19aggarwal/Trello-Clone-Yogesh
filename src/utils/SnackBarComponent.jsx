import React from 'react'
import { Snackbar, Alert } from '@mui/material'

const SnackBarComponent = ({severity, message, snackbarOpen, setSnackbarOpen}) => {
  return (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={6000}
      onClose={() =>
        setSnackbarOpen(false)
      }
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={() =>
         setSnackbarOpen(false)
       }
        severity={severity}
        sx={{ width: "100%" }} 
      >
        {message}
      </Alert>
    </Snackbar>
  )
}

export default SnackBarComponent