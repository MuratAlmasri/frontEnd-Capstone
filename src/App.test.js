import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Integration', () => {
  test('renders complete app with all components', () => {
    render(<App />);
    
    // Check for Header
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getAllByText(/little lemon/i)).toHaveLength(3); // Header, Hero, Footer
    
    // Check for Hero section
    expect(screen.getByText(/we are a family owned mediterranean restaurant/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /reserve a table at little lemon/i })).toBeInTheDocument();
    
    // Check for Booking Form
    expect(screen.getByRole('heading', { name: /reserve a table/i })).toBeInTheDocument();
    expect(screen.getByRole('form', { name: /table reservation form/i })).toBeInTheDocument();
    
    // Check for Footer
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByText(/© 2025 little lemon restaurant/i)).toBeInTheDocument();
  });

  test('navigation between hero CTA and booking form works', () => {
    render(<App />);
    
    // Click the CTA button in hero
    const ctaButton = screen.getByRole('link', { name: /reserve a table at little lemon/i });
    
    // Since this is just a hash link, we can verify it exists and has correct href
    expect(ctaButton).toHaveAttribute('href', '#reservations');
    
    // Verify the booking form is present (would be scrolled to in real app)
    expect(screen.getByRole('form', { name: /table reservation form/i })).toBeInTheDocument();
  });

  test('app has proper semantic structure', () => {
    render(<App />);
    
    // Check for main landmark
    expect(screen.getByRole('main')).toBeInTheDocument();
    
    // Check for header landmark
    expect(screen.getByRole('banner')).toBeInTheDocument();
    
    // Check for footer landmark
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    
    // Check for navigation landmark
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});
