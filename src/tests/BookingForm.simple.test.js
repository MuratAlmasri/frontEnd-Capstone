import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookingForm from '../components/BookingForm';

// Mock the onSubmit function
const mockOnSubmit = jest.fn();

// Helper function to get tomorrow's date in YYYY-MM-DD format
const getTomorrowDate = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
};

describe('BookingForm', () => {
  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  test('renders booking form with all required fields', () => {
    render(<BookingForm onSubmit={mockOnSubmit} />);
    
    // Check for form title
    expect(screen.getByRole('heading', { name: /reserve a table/i })).toBeInTheDocument();
    
    // Check for all required form fields
    expect(screen.getByLabelText(/date \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/time \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of guests \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/full name \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number \*/i)).toBeInTheDocument();
    
    // Check for optional fields
    expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/special requests/i)).toBeInTheDocument();
    
    // Check for submit button
    expect(screen.getByRole('button', { name: /make reservation/i })).toBeInTheDocument();
  });

  test('displays validation errors for empty required fields', async () => {
    render(<BookingForm onSubmit={mockOnSubmit} />);
    
    const submitButton = screen.getByRole('button', { name: /make reservation/i });
    await userEvent.click(submitButton);
    
    // Check for validation error messages
    expect(await screen.findByText(/date is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/time is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/phone number is required/i)).toBeInTheDocument();
    
    // Ensure form was not submitted
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test('validates date cannot be in the past', async () => {
    render(<BookingForm onSubmit={mockOnSubmit} />);
    
    const dateInput = screen.getByLabelText(/date \*/i);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toISOString().split('T')[0];
    
    await userEvent.type(dateInput, yesterdayString);
    
    const submitButton = screen.getByRole('button', { name: /make reservation/i });
    await userEvent.click(submitButton);
    
    expect(await screen.findByText(/please select a future date/i)).toBeInTheDocument();
  });

  test('validates guest count is within acceptable range', async () => {
    render(<BookingForm onSubmit={mockOnSubmit} />);
    
    const guestsInput = screen.getByLabelText(/number of guests \*/i);
    
    // Test with 0 guests
    await userEvent.clear(guestsInput);
    await userEvent.type(guestsInput, '0');
    
    const submitButton = screen.getByRole('button', { name: /make reservation/i });
    await userEvent.click(submitButton);
    
    expect(await screen.findByText(/number of guests must be between 1 and 10/i)).toBeInTheDocument();
  });

  test('validates email format', async () => {
    render(<BookingForm onSubmit={mockOnSubmit} />);
    
    const emailInput = screen.getByLabelText(/email address \*/i);
    await userEvent.type(emailInput, 'invalid-email');
    
    const submitButton = screen.getByRole('button', { name: /make reservation/i });
    await userEvent.click(submitButton);
    
    expect(await screen.findByText(/please enter a valid email address/i)).toBeInTheDocument();
  });

  test('clears error when user starts typing in field', async () => {
    render(<BookingForm onSubmit={mockOnSubmit} />);
    
    const nameInput = screen.getByLabelText(/full name \*/i);
    const submitButton = screen.getByRole('button', { name: /make reservation/i });
    
    // Trigger validation error
    await userEvent.click(submitButton);
    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
    
    // Start typing in name field
    await userEvent.type(nameInput, 'John');
    
    // Error should be cleared
    expect(screen.queryByText(/name is required/i)).not.toBeInTheDocument();
  });

  test('submits form successfully with valid data', async () => {
    // Mock window.alert
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    
    render(<BookingForm onSubmit={mockOnSubmit} />);
    
    // Fill out the form with valid data
    await userEvent.type(screen.getByLabelText(/date \*/i), getTomorrowDate());
    await userEvent.selectOptions(screen.getByLabelText(/time \*/i), '19:00');
    await userEvent.clear(screen.getByLabelText(/number of guests \*/i));
    await userEvent.type(screen.getByLabelText(/number of guests \*/i), '4');
    await userEvent.selectOptions(screen.getByLabelText(/occasion/i), 'Anniversary');
    await userEvent.type(screen.getByLabelText(/full name \*/i), 'John Doe');
    await userEvent.type(screen.getByLabelText(/email address \*/i), 'john.doe@email.com');
    await userEvent.type(screen.getByLabelText(/phone number \*/i), '1234567890');
    await userEvent.type(screen.getByLabelText(/special requests/i), 'Window seat please');
    
    const submitButton = screen.getByRole('button', { name: /make reservation/i });
    await userEvent.click(submitButton);
    
    // Wait for form submission
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        date: getTomorrowDate(),
        time: '19:00',
        guests: 4,
        occasion: 'Anniversary',
        name: 'John Doe',
        email: 'john.doe@email.com',
        phone: '1234567890',
        specialRequests: 'Window seat please'
      });
    });
    
    // Check success message
    expect(alertSpy).toHaveBeenCalledWith('Reservation submitted successfully! We will confirm your booking via email.');
    
    alertSpy.mockRestore();
  });

  test('has proper accessibility attributes', () => {
    render(<BookingForm onSubmit={mockOnSubmit} />);
    
    // Check for proper form labeling
    expect(screen.getByRole('form', { name: /table reservation form/i })).toBeInTheDocument();
    
    // Check for section headings
    expect(screen.getByRole('heading', { name: /reservation details/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /contact information/i })).toBeInTheDocument();
    
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
