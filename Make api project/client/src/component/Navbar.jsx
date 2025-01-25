import React from 'react';
import { NavLink } from 'react-router-dom';

const NavigationBar = () => {
  const token=localStorage.getItem('token');
  const name=localStorage.getItem('Username')
  const Logout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('Username');
    localStorage.removeItem('role');
    localStorage.removeItem('id');
    
    
  }
  return (
    <nav className="navbar" style={{backgroundColor:"#d3bebe"}}>
      <ul className="nav-list">
        <li>
          <NavLink to="/" className="nav-link" activeClassName="active-link" exact>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className="nav-link" activeClassName="active-link">
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" className="nav-link" activeClassName="active-link">
            Users
          </NavLink>
        </li>
        <li>
          <NavLink to="/signup" className="nav-link" activeClassName="active-link">
            SignUp
          </NavLink>
        </li>
        <li>
        {
            !token ?   <NavLink to="/login" className="nav-link" activeClassName="active-link">
          Login
        </NavLink>:
        <button style={{backgroundColor:"transparent",border:"1px solid white",color:"white",borderRadius:"5px",padding:"5px 10px",marginTop:"-5px",}}   onClick={()=>Logout()} >
         <a href="" style={{textDecoration:"none",color:"white"}}> Logout</a>
          </button>
        }
        </li>
        <li style={{marginRight:"-80px"}}>{name}</li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
