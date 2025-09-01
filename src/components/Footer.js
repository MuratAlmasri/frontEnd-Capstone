import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Little Lemon</h3>
          <p>Authentic Mediterranean cuisine in the heart of Chicago.</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#home" aria-label="Go to home page">Home</a></li>
            <li><a href="#about" aria-label="Learn about us">About</a></li>
            <li><a href="#menu" aria-label="View our menu">Menu</a></li>
            <li><a href="#reservations" aria-label="Make a reservation">Reservations</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Contact Info</h4>
          <address>
            <p>123 Mediterranean Ave<br />
            Chicago, IL 60601</p>
            <p>
              <a href="tel:+1234567890" aria-label="Call us at (123) 456-7890">
                Phone: (123) 456-7890
              </a>
            </p>
            <p>
              <a href="mailto:info@littlelemon.com" aria-label="Email us at info@littlelemon.com">
                Email: info@littlelemon.com
              </a>
            </p>
          </address>
        </div>
        
        <div className="footer-section">
          <h4>Hours</h4>
          <div className="hours">
            <p>Mon-Thu: 11:00 AM - 10:00 PM</p>
            <p>Fri-Sat: 11:00 AM - 11:00 PM</p>
            <p>Sunday: 12:00 PM - 9:00 PM</p>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2025 Little Lemon Restaurant. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
