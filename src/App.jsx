import { Routes, Route, Navigate } from "react-router-dom"

import HomePage from "./pages/HomePage"
import BoardPage from "./pages/BoardPage"
import NotFound from "./pages/NotFound"
import MainLayout from "./layouts/MainLayout"

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/boards" replace />} />

        <Route path="/" element={<MainLayout />}> 
          <Route path="/boards" element={<HomePage/>} />
          <Route path="boards/:boardId" element={<BoardPage/>} />
          <Route path="*" element={<NotFound/>} />
        </Route>
        
      </Routes>
    </>
  )
}

export default App