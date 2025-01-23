import { Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import BoardPage from "./pages/BoardPage"

const App = () => {
  return (
    <>
      <Navbar/>

      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/:boardId" element={<BoardPage/>} />
      </Routes>
    </>
  )
}

export default App