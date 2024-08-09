import React, { useState } from 'react';
import './App.css'; // Import a CSS file for styling

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="navbar">
      <a href="#home">Home</a>
      <a href="#news">News</a>
      <div className="dropdown">
        <button className="dropbtn" onClick={() => setShowDropdown(!showDropdown)}>
          Dropdown
          <i className="fa fa-caret-down"></i>
        </button>
        {showDropdown && (
          <div className="dropdown-content">
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
