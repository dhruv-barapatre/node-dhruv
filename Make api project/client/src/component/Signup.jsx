import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    dateOfBirth: "",
    location: "",
    password: "",
    role: "",
    confirmPassword: "",
  });
  const { id } = useParams();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_URL}/User/${id}`)
      .then((res) => {
        setFormData(res.data.rest);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log(formData)
    if (!id) {
      axios
        .post(`${import.meta.env.VITE_URL}/Usercreate`, formData, {}, {})
        .then((res) => {
          localStorage.setItem(
            "autharization_token",
            res.data.autharization_token
          );
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      axios
        .patch(`${import.meta.env.VITE_URL}/UserUpdate/${id}`, formData, {
          headers: {
            "Content-Type": "application/json",
            token: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          navigate("/users");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <form className="sign-up-form" onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
      <input
        type="text"
        name="username"
        placeholder="Username"
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />
      <input type="date" name="dateOfBirth" onChange={handleChange} />

      <input
        type="text"
        name="location"
        placeholder="Location"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        onChange={handleChange}
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default SignUp;
