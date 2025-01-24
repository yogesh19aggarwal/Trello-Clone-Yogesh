import { Routes, Route, Navigate } from "react-router-dom"

import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import BoardPage from "./pages/BoardPage"

const App = () => {
  return (
    <>
      <Navbar/>

      <Routes>
        <Route path="/" element={<Navigate to="/boards" replace />} />
        <Route path="/boards" element={<HomePage/>} />
        <Route path="boards/:boardId" element={<BoardPage/>} />
      </Routes>
    </>
  )
}

export default App