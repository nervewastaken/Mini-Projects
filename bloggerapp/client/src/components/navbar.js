import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('username');
  };

  return (
    <div className="navbar-container">
      <div className="navbar">
        <div className="navbar-links">
          <Link to="/HomePage" className="nav-link"><button>Home</button></Link>
          <Link to="/CreateBlog" className="nav-link"><button>My Blogs</button></Link>
        </div>
        <div className="navbar-profile">
          <span className="welcome-text">Welcome, {username}</span>
          <Link to={"/"} className="nav-link"><button onClick={handleLogout}>Logout</button></Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
