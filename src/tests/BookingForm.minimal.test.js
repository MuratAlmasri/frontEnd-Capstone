import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookingForm from '../components/BookingForm';

const mockOnSubmit = jest.fn();

describe('BookingForm', () => {
  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  test('renders booking form with all required fields', () => {
    render(<BookingForm onSubmit={mockOnSubmit} />);
    
    expect(screen.getByLabelText(/date \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/time \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of guests \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/full name \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number \*/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /make reservation/i })).toBeInTheDocument();
  });

  test('displays validation errors for empty required fields', async () => {
    render(<BookingForm onSubmit={mockOnSubmit} />);
    
    const submitButton = screen.getByRole('button', { name: /make reservation/i });
    await userEvent.click(submitButton);
    
    expect(await screen.findByText(/date is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/time is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/full name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/phone number is required/i)).toBeInTheDocument();
  });

  test('validates date cannot be in the past', async () => {
    render(<BookingForm onSubmit={mockOnSubmit} />);
    
    const dateInput = screen.getByLabelText(/date \*/i);
    const submitButton = screen.getByRole('button', { name: /make reservation/i });
    
    // Set a past date
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);
    const pastDateString = pastDate.toISOString().split('T')[0];
    
    await userEvent.type(dateInput, pastDateString);
    await userEvent.click(submitButton);
    
    expect(await screen.findByText(/date cannot be in the past/i)).toBeInTheDocument();
  });

  test('has proper accessibility attributes', () => {
    render(<BookingForm onSubmit={mockOnSubmit} />);
    
    // Check ARIA labels and roles
    expect(screen.getByRole('form', { name: /table reservation form/i })).toBeInTheDocument();
    
    // Check required fields have aria-required
    const requiredFields = [
      screen.getByLabelText(/date \*/i),
      screen.getByLabelText(/time \*/i),
      screen.getByLabelText(/number of guests \*/i),
      screen.getByLabelText(/full name \*/i),
      screen.getByLabelText(/email address \*/i),
      screen.getByLabelText(/phone number \*/i)
    ];
    
    requiredFields.forEach(field => {
      expect(field).toHaveAttribute('aria-required', 'true');
    });
  });

  test('displays help text for relevant fields', () => {
    render(<BookingForm onSubmit={mockOnSubmit} />);
    
    expect(screen.getByText(/maximum 10 guests per reservation/i)).toBeInTheDocument();
    expect(screen.getByText(/let us know if you have any special requirements/i)).toBeInTheDocument();
    expect(screen.getByText(/\* required fields/i)).toBeInTheDocument();
  });
});
