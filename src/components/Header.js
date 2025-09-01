import React from 'react';
import './Header.css';
import logo from '../assets/logo.jpg';

const Header = () => {
  return (
    <header className="header" role="banner">
      <div className="header-container">
        <div className="logo-section">
          <img src={logo} alt="Little Lemon Restaurant Logo" className="logo" />
          <h1 className="restaurant-name">Little Lemon</h1>
        </div>
        <nav className="navigation" role="navigation" aria-label="Main navigation">
          <ul className="nav-list">
            <li><a href="#home" aria-label="Go to home page">Home</a></li>
            <li><a href="#about" aria-label="Learn about us">About</a></li>
            <li><a href="#menu" aria-label="View our menu">Menu</a></li>
            <li><a href="#reservations" aria-label="Make a reservation">Reservations</a></li>
            <li><a href="#contact" aria-label="Contact us">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
