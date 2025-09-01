import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookingForm from '../components/BookingForm';

// Mock the API utilities
jest.mock('../utils/api', () => ({
  initializeTimes: jest.fn(() => ['17:00', '18:00', '19:00', '20:00']),
  updateTimes: jest.fn((date) => {
    // Return different times based on date for testing
    const day = new Date(date).getDay();
    if (day === 0 || day === 6) { // Weekend
      return ['17:00', '18:00', '19:00', '20:00', '21:00'];
    }
    return ['17:30', '18:30', '19:30', '20:30']; // Weekday
  }),
  submitAPI: jest.fn(() => Promise.resolve(true))
}));

const mockOnSubmit = jest.fn();

describe('BookingForm API Integration', () => {
  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  test('initializes with default available times', () => {
    render(<BookingForm onSubmit={mockOnSubmit} />);
    
    // Check that the select has the mocked initial times
    expect(screen.getByDisplayValue('Select a time')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '17:00' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '18:00' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '19:00' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '20:00' })).toBeInTheDocument();
  });

  test('updates available times when date changes', async () => {
    render(<BookingForm onSubmit={mockOnSubmit} />);
    
    const dateInput = screen.getByLabelText(/date \*/i);
    
    // Select a weekday date (should trigger updateTimes with weekday times)
    const weekdayDate = '2025-09-15'; // Monday
    await userEvent.type(dateInput, weekdayDate);
    
    // Check that weekday times are now available
    await waitFor(() => {
      expect(screen.getByRole('option', { name: '17:30' })).toBeInTheDocument();
    });
    
    expect(screen.getByRole('option', { name: '18:30' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '19:30' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '20:30' })).toBeInTheDocument();
  });

  test('clears selected time when date changes', async () => {
    render(<BookingForm onSubmit={mockOnSubmit} />);
    
    const dateInput = screen.getByLabelText(/date \*/i);
    const timeSelect = screen.getByLabelText(/time \*/i);
    
    // First select a time
    await userEvent.selectOptions(timeSelect, '19:00');
    expect(timeSelect.value).toBe('19:00');
    
    // Then change the date
    await userEvent.type(dateInput, '2025-09-15');
    
    // Time should be cleared
    await waitFor(() => {
      expect(timeSelect.value).toBe('');
    });
  });

  test('uses API for form submission', async () => {
    const { submitAPI } = require('../utils/api');
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    
    render(<BookingForm onSubmit={mockOnSubmit} />);
    
    // Fill out the form
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowString = tomorrow.toISOString().split('T')[0];
    
    await userEvent.type(screen.getByLabelText(/date \*/i), tomorrowString);
    await userEvent.selectOptions(screen.getByLabelText(/time \*/i), '19:00');
    await userEvent.type(screen.getByLabelText(/full name \*/i), 'Test User');
    await userEvent.type(screen.getByLabelText(/email address \*/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/phone number \*/i), '1234567890');
    
    // Submit the form
    await userEvent.click(screen.getByRole('button', { name: /make reservation/i }));
    
    // Wait for submission
    await waitFor(() => {
      expect(submitAPI).toHaveBeenCalledWith(expect.objectContaining({
        date: tomorrowString,
        time: '19:00',
        name: 'Test User',
        email: 'test@example.com',
        phone: '1234567890'
      }));
    });
    
    expect(mockOnSubmit).toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalledWith('Reservation submitted successfully! We will confirm your booking via email.');
    
    alertSpy.mockRestore();
  });

  test('handles API errors gracefully', async () => {
    const { submitAPI } = require('../utils/api');
    submitAPI.mockRejectedValueOnce(new Error('API Error'));
    
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    render(<BookingForm onSubmit={mockOnSubmit} />);
    
    // Fill out the form
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowString = tomorrow.toISOString().split('T')[0];
    
    await userEvent.type(screen.getByLabelText(/date \*/i), tomorrowString);
    await userEvent.selectOptions(screen.getByLabelText(/time \*/i), '19:00');
    await userEvent.type(screen.getByLabelText(/full name \*/i), 'Test User');
    await userEvent.type(screen.getByLabelText(/email address \*/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/phone number \*/i), '1234567890');
    
    // Submit the form
    await userEvent.click(screen.getByRole('button', { name: /make reservation/i }));
    
    // Wait for error handling
    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('There was an error submitting your reservation. Please try again.');
    });
    
    expect(consoleSpy).toHaveBeenCalledWith('Submission error:', expect.any(Error));
    
    alertSpy.mockRestore();
    consoleSpy.mockRestore();
    submitAPI.mockResolvedValue(true); // Reset for other tests
  });
});
