import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const navigate=useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Both email and password are required.");
      return;
    }
    axios.post(`${import.meta.env.VITE_URL}user/login`,formData).then((res)=>{
      localStorage.setItem("Token",res.data.token);
      navigate('/')
    })  
    .catch((er)=>{
        console.log(er);
    })
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="login-input-group">
          <label htmlFor="email" className="login-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="login-input"
            placeholder="Enter your email"
          />
        </div>
        <div className="login-input-group">
          <label htmlFor="password" className="login-label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="login-input"
            placeholder="Enter your password"
          />
        </div>
        {error && <p className="login-error">{error}</p>}
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
