import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../components/Header';

describe('Header', () => {
  test('renders header with restaurant name and logo', () => {
    render(<Header />);
    
    // Check for restaurant name
    expect(screen.getByRole('heading', { name: /little lemon/i })).toBeInTheDocument();
    
    // Check for logo
    expect(screen.getByAltText(/little lemon restaurant logo/i)).toBeInTheDocument();
  });

  test('renders navigation menu with all links', () => {
    render(<Header />);
    
    // Check for navigation landmark
    expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument();
    
    // Check for all navigation links
    expect(screen.getByRole('link', { name: /go to home page/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /learn about us/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /view our menu/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /make a reservation/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contact us/i })).toBeInTheDocument();
  });

  test('has proper accessibility attributes', () => {
    render(<Header />);
    
    // Check for banner role
    expect(screen.getByRole('banner')).toBeInTheDocument();
    
    // Check for proper navigation labeling
    expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Main navigation');
    
    // Check that all links have proper aria-labels
    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveAttribute('aria-label');
    });
  });

  test('navigation links have correct href attributes', () => {
    render(<Header />);
    
    expect(screen.getByRole('link', { name: /go to home page/i })).toHaveAttribute('href', '#home');
    expect(screen.getByRole('link', { name: /learn about us/i })).toHaveAttribute('href', '#about');
    expect(screen.getByRole('link', { name: /view our menu/i })).toHaveAttribute('href', '#menu');
    expect(screen.getByRole('link', { name: /make a reservation/i })).toHaveAttribute('href', '#reservations');
    expect(screen.getByRole('link', { name: /contact us/i })).toHaveAttribute('href', '#contact');
  });
});
