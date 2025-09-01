import React from 'react';
import { render, screen } from '@testing-library/react';
import Hero from '../components/Hero';

describe('Hero', () => {
  test('renders hero section with restaurant information', () => {
    render(<Hero />);
    
    // Check for restaurant name and location
    expect(screen.getByRole('heading', { name: /little lemon/i, level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /chicago/i, level: 2 })).toBeInTheDocument();
    
    // Check for description
    expect(screen.getByText(/we are a family owned mediterranean restaurant/i)).toBeInTheDocument();
  });

  test('renders call-to-action button', () => {
    render(<Hero />);
    
    const ctaButton = screen.getByRole('link', { name: /reserve a table at little lemon/i });
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toHaveAttribute('href', '#reservations');
  });

  test('renders hero image with proper alt text', () => {
    render(<Hero />);
    
    const heroImage = screen.getByAltText(/delicious mediterranean dish served at little lemon restaurant/i);
    expect(heroImage).toBeInTheDocument();
    expect(heroImage).toHaveAttribute('src');
  });

  test('has proper accessibility attributes', () => {
    render(<Hero />);
    
    // Check for proper heading hierarchy
    const h1 = screen.getByRole('heading', { level: 1 });
    const h2 = screen.getByRole('heading', { level: 2 });
    
    expect(h1).toHaveTextContent(/little lemon/i);
    expect(h2).toHaveTextContent(/chicago/i);
  });

  test('CTA button has proper aria-label', () => {
    render(<Hero />);
    
    const ctaButton = screen.getByRole('link', { name: /reserve a table at little lemon/i });
    expect(ctaButton).toHaveAttribute('aria-label', 'Reserve a table at Little Lemon');
  });
});
