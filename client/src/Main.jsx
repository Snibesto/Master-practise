import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import Login from './pages/Login.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={localStorage.getItem("jwt") == null ? <Login /> : <App />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </Router>
  </StrictMode>,
)
