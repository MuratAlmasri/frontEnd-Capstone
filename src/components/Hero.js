import React from 'react';
import './Hero.css';
import heroImage from '../assets/1.jpg';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">Little Lemon</h1>
            <h2 className="hero-subtitle">Chicago</h2>
            <p className="hero-description">
              We are a family owned Mediterranean restaurant, focused on traditional 
              recipes served with a modern twist. Experience authentic flavors in 
              a warm, welcoming atmosphere.
            </p>
            <a 
              href="#reservations" 
              className="cta-button"
              aria-label="Reserve a table at Little Lemon"
            >
              Reserve a Table
            </a>
          </div>
          <div className="hero-image">
            <img 
              src={heroImage} 
              alt="Delicious Mediterranean dish served at Little Lemon restaurant"
              className="hero-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
