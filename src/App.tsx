import { Signin } from "./pages/Signin"
import { Signup } from "./pages/Signup"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Dashboard } from "./pages/dashboard"
import { Landing } from "./pages/landing"


function App() {
  return <BrowserRouter>
  <Routes>
    <Route path="/" element={<Navigate to="/landing" replace />} />
    <Route path="/landing" element={<Landing />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/signin" element={<Signin />} />
    <Route path="/dashboard" element={<Dashboard />} />
  </Routes>
  </BrowserRouter>
}

export default App
