import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from "./pages/Dashboard.jsx"
import Register from './pages/Register.jsx'
import Login from "./pages/Login.jsx"
import Gallery from './pages/Gallery.jsx'

createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path="/" element={localStorage.getItem("lsUser") == null ? <Register /> : <Dashboard />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
      <Route path="/gallery" element={<Gallery />}></Route>
    </Routes>
  </Router>
)
