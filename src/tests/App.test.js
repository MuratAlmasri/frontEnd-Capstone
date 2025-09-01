import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('App Integration', () => {
  test('renders complete app with all components', () => {
    render(<App />);
    
    // Check for Header
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: /little lemon/i })).toBeInTheDocument();
    
    // Check for Hero section
    expect(screen.getByText(/we are a family owned mediterranean restaurant/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /reserve a table at little lemon/i })).toBeInTheDocument();
    
    // Check for Booking Form
    expect(screen.getByRole('heading', { level: 2, name: /reserve a table/i })).toBeInTheDocument();
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

  test('form submission callback is properly connected', async () => {
    // Mock console.log to verify the callback
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    
    render(<App />);
    
    // Fill out and submit the form
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowString = tomorrow.toISOString().split('T')[0];
    
    await userEvent.type(screen.getByLabelText(/date \*/i), tomorrowString);
    await userEvent.selectOptions(screen.getByLabelText(/time \*/i), '19:00');
    await userEvent.type(screen.getByLabelText(/full name \*/i), 'Test User');
    await userEvent.type(screen.getByLabelText(/email address \*/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/phone number \*/i), '1234567890');
    
    await userEvent.click(screen.getByRole('button', { name: /make reservation/i }));
    
    // Wait for form processing
    await screen.findByText('Submitting...');
    
    // Check that console.log was called (indicating the callback was triggered)
    expect(consoleSpy).toHaveBeenCalledWith('Reservation submitted:', expect.any(Object));
    
    consoleSpy.mockRestore();
    alertSpy.mockRestore();
  });
});
