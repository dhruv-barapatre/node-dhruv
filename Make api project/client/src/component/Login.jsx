import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const navigate=useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${import.meta.env.VITE_URL}/Usersignup`,credentials,{
headers:{
    'Content-Type': 'application/json',
    token:`Bearer ${localStorage.getItem('autharization_token')}`
}},{
    }).then((res)=>{  
        navigate('/')  
        localStorage.setItem("token",res.data.token)
        localStorage.setItem("Username",res.data.username)
        localStorage.setItem("id",res.data._id)
        localStorage.setItem("role",res.data.role)
    })
    .catch((error) => {
        console.error(error);
    })
  };

  return (
    <form class="login-form" onSubmit={handleSubmit}>
  <h1>Login</h1>
  <input type="text" name="email" placeholder="email" onChange={handleChange} required />
  <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
  <button type="submit" style={{backgroundColor:"#a9a8a6"}}>Login</button>
</form>
  );
};

export default LoginPage;