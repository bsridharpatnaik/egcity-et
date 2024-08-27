import React, { useState } from 'react';
import logo from '../../assets/evergreen.png';
import './login.css';
import lock from "../../assets/Frame.svg"; 
import hidden from "../../assets/Group.svg";
import profile from "../../assets/Profile.svg";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const loginData = {
      username: email,
      password: password,
    };

    try {
      const response = await fetch('https://app.3pagecrm.com/expense-tracker/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful', data);
        window.location.href="/dashboard"
        localStorage.setItem("user",JSON.stringify(data))
        // Handle successful login, e.g., redirect to dashboard
      } else {
        console.error('Login failed', response.statusText);
        // Handle login failure, e.g., show error message
      }
    } catch (error) {
      console.error('Error occurred during login', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <img src={logo} alt="Evergreen City Logo" className="login-logo" />
      <div style={{display:"flex", flexDirection:"column", justifyContent:"start", marginRight:"59px"}}>
        <h2>Login Account</h2>
        <p>Please login with your registered account.</p>
      </div>

      <div className="input-group">
        <label>Username</label>
        <div className="input-wrapper">
          <img src={profile} alt="Profile Icon" className="input-icon" />
          <input
            type="email"
            placeholder="Enter Username"
            style={{color:"black"}}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="input-group">
        <label>Password</label>
        <div className="input-wrapper">
          <img src={lock} alt="Lock Icon" className="input-icon" />
          <input
            type={passwordShown ? "text" : "password"}
            placeholder="Enter your password"
            style={{color:"black"}}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <img
            src={hidden}
            alt="Toggle Visibility Icon"
            className="toggle-icon"
            onClick={togglePasswordVisibility}
            style={{ cursor: 'pointer' }}
          />
        </div>
      </div>

      <button className="login-button" onClick={handleSubmit} disabled={loading}>
        {loading ? (
          <div className="loader"></div>  
        ) : (
          "Sign In"
        )}
      </button>
    </div>
  );
}

export default Login;
