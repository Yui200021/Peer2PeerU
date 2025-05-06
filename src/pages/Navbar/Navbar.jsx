import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="/Peer2Peer2.png" alt="Peer2PeerU Logo" className="navbar-logo-img" />
        <h1 className="navbar-logo-text">Peer2PeerU</h1>
      </div>

     
      <button className="hamburger-menu" onClick={toggleMenu}>
        <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
        <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
        <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
      </button>

      <div className={`navbar-right ${isMenuOpen ? 'open' : ''}`}>
        <ul className="navbar-links">
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/transactions">Transactions</Link></li>
          <li className="navbar-search">
            <input type="text" placeholder="Search..." />
            <button className="search-button">Search</button>
          </li>
          <li>
            <Link to={`/profile/${localStorage.getItem("studentId")}`}>
              <img src="/user.png" alt="Profile" className="profile-icon" />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
