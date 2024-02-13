import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import SignUp from "./components/SignUp"
import LogIn from "./components/LogIn"
import Home from "./components/Home"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<SignUp />}></Route>
        <Route path='/login' element={<LogIn />}></Route>
        <Route path='/' element={<Navigate to='/register' />} />
        <Route path='/Home' element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
