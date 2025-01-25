import axios from "axios";
import React, { useState } from "react";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); 

    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }
axios.post(`${import.meta.env.VITE_URL}user/register`,formData)
.then((res)=>{
    console.log(res.data)
})
.catch((err)=>{
    console.log(err?.message)
})
    setFormData({ name: "", email: "", password: "" });
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Signup</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="signup-input-group">
          <label htmlFor="name" className="signup-label">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="signup-input"
            placeholder="Enter your name"
          />
        </div>

        <div className="signup-input-group">
          <label htmlFor="email" className="signup-label">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="signup-input"
            placeholder="Enter your email"
          />
        </div>

        <div className="signup-input-group">
          <label htmlFor="password" className="signup-label">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="signup-input"
            placeholder="Enter your password"
          />
        </div>

        {error && <p className="signup-error">{error}</p>}

        <button type="submit" className="signup-button">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
