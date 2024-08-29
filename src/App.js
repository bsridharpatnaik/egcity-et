import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import logo from "./assets/evergreen.png"
import "./App.css";
import BalanceCard from "./pages/BalanceCard/BalanceCard";
import Login from "./pages/Login/Login";

function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/dashboard"); 
    }, 3000);

    return () => clearTimeout(timer); 
  }, [navigate]);

  return (
    <div className="splash-screen">
      <img src={logo} alt="Evergreen City Logo" className="logo" />
    </div>
  );
}

function Home() {
  return (
    <div className="home">
      <h1>Welcome to Evergreen City</h1>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<BalanceCard />} />
      </Routes>
    </Router>
  );
}

export default App;
