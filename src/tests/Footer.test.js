import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';

describe('Footer', () => {
  test('renders footer with restaurant information', () => {
    render(<Footer />);
    
    // Check for restaurant name
    expect(screen.getByRole('heading', { name: /little lemon/i })).toBeInTheDocument();
    
    // Check for restaurant description
    expect(screen.getByText(/authentic mediterranean cuisine/i)).toBeInTheDocument();
  });

  test('renders quick links section', () => {
    render(<Footer />);
    
    expect(screen.getByRole('heading', { name: /quick links/i })).toBeInTheDocument();
    
    // Check for quick links
    expect(screen.getByRole('link', { name: /go to home page/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /learn about us/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /view our menu/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /make a reservation/i })).toBeInTheDocument();
  });

  test('renders contact information section', () => {
    render(<Footer />);
    
    expect(screen.getByRole('heading', { name: /contact info/i })).toBeInTheDocument();
    
    // Check for address
    expect(screen.getByText(/123 mediterranean ave/i)).toBeInTheDocument();
    expect(screen.getByText(/chicago, il 60601/i)).toBeInTheDocument();
    
    // Check for contact links
    expect(screen.getByRole('link', { name: /call us at \(123\) 456-7890/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /email us at info@littlelemon.com/i })).toBeInTheDocument();
  });

  test('renders hours section', () => {
    render(<Footer />);
    
    expect(screen.getByRole('heading', { name: /hours/i })).toBeInTheDocument();
    
    // Check for operating hours
    expect(screen.getByText(/mon-thu: 11:00 am - 10:00 pm/i)).toBeInTheDocument();
    expect(screen.getByText(/fri-sat: 11:00 am - 11:00 pm/i)).toBeInTheDocument();
    expect(screen.getByText(/sunday: 12:00 pm - 9:00 pm/i)).toBeInTheDocument();
  });

  test('renders copyright information', () => {
    render(<Footer />);
    
    expect(screen.getByText(/© 2025 little lemon restaurant. all rights reserved./i)).toBeInTheDocument();
  });

  test('has proper accessibility attributes', () => {
    render(<Footer />);
    
    // Check for contentinfo role
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    
    // Check for proper address element
    expect(screen.getByRole('group')).toBeInTheDocument(); // address element
  });

  test('contact links have proper attributes', () => {
    render(<Footer />);
    
    const phoneLink = screen.getByRole('link', { name: /call us at \(123\) 456-7890/i });
    expect(phoneLink).toHaveAttribute('href', 'tel:+1234567890');
    
    const emailLink = screen.getByRole('link', { name: /email us at info@littlelemon.com/i });
    expect(emailLink).toHaveAttribute('href', 'mailto:info@littlelemon.com');
  });
});
