import axios from 'axios';
import React from 'react';
import { Link } from 'react-router';

const UserDetails = ({ username,email,id, role,dateOfBirth,location, }) => {
const deleteUser=(id)=>{
  axios.delete(`${import.meta.env.VITE_URL}/Userdelete/${id}`,{
    headers: {
      'Content-Type': "application/json",
      token: `Bearer ${localStorage.getItem('token')}`
  }
  }).then((res)=>{
    console.log(res.data);
  }).catch((err)=>{
    console.log(err);
  })
}

  return (
    <div key={id}>
      <div className="user-details-container" key={id} >
        <div className="user-card" key={id} >
          <h2>{username}</h2>
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Date of Birth:</strong> {dateOfBirth}
          </p>
          <p>
            <strong>Role:</strong> {role}
          </p>
          <p>
            <strong>Location:</strong> {location}
          </p>
          {role === "admin" && (
            <div className="card-actions">
              <button
                className="update-button"
              >
                <Link style={{color:"white",textDecoration:"none"}} to={`/Signup/${id}`}>Update</Link>
              </button>
              <button
                className="delete-button"
                onClick={()=>deleteUser(id)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
