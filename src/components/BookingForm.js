import React, { useState, useReducer } from 'react';
import './BookingForm.css';
import { initializeTimes, updateTimes, submitAPI } from '../utils/api';

// Occasions for special events
const occasions = ['Birthday', 'Anniversary', 'Engagement', 'Other'];

// Reducer for managing available times
const timesReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_TIMES':
      return updateTimes(action.payload);
    case 'INITIALIZE_TIMES':
      return initializeTimes();
    default:
      return state;
  }
};

// Form validation helper
const validateForm = (formData) => {
  const errors = {};
  
  // Date validation
  const selectedDate = new Date(formData.date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (!formData.date) {
    errors.date = 'Date is required';
  } else if (selectedDate < today) {
    errors.date = 'Please select a future date';
  }
  
  // Time validation
  if (!formData.time) {
    errors.time = 'Time is required';
  }
  
  // Guests validation
  if (!formData.guests) {
    errors.guests = 'Number of guests is required';
  } else if (formData.guests < 1 || formData.guests > 10) {
    errors.guests = 'Number of guests must be between 1 and 10';
  }
  
  // Name validation
  if (!formData.name.trim()) {
    errors.name = 'Name is required';
  } else if (formData.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email) {
    errors.email = 'Email is required';
  } else if (!emailRegex.test(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  // Phone validation
  const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
  if (!formData.phone) {
    errors.phone = 'Phone number is required';
  } else if (!phoneRegex.test(formData.phone.replace(/[\s\-()]/g, ''))) {
    errors.phone = 'Please enter a valid phone number';
  }
  
  return errors;
};

const BookingForm = ({ onSubmit }) => {
  const [times, dispatch] = useReducer(timesReducer, initializeTimes());
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: 1,
    occasion: 'Birthday',
    name: '',
    email: '',
    phone: '',
    specialRequests: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Update available times when date changes
    if (name === 'date' && value) {
      dispatch({ type: 'UPDATE_TIMES', payload: value });
      // Clear selected time when date changes since times might be different
      setFormData(prev => ({
        ...prev,
        time: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm(formData);
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      // Focus on first error field for accessibility
      const firstErrorField = Object.keys(formErrors)[0];
      const errorElement = document.getElementById(firstErrorField);
      if (errorElement) {
        errorElement.focus();
      }
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Use the API submission function
      const success = await submitAPI(formData);
      
      if (success) {
        if (onSubmit) {
          onSubmit(formData);
        }
        
        // Reset form after successful submission
        setFormData({
          date: '',
          time: '',
          guests: 1,
          occasion: 'Birthday',
          name: '',
          email: '',
          phone: '',
          specialRequests: ''
        });
        
        // Reset available times when form is cleared
        dispatch({ type: 'INITIALIZE_TIMES' });
        
        alert('Reservation submitted successfully! We will confirm your booking via email.');
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error submitting your reservation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <section className="booking-section" aria-labelledby="booking-heading">
      <div className="booking-container">
        <h2 id="booking-heading" className="booking-title">Reserve a Table</h2>
        <p className="booking-subtitle">Book your table at Little Lemon for an unforgettable dining experience.</p>
        
        <form 
          className="booking-form" 
          onSubmit={handleSubmit}
          noValidate
          aria-label="Table reservation form"
        >
          <div className="form-section">
            <h3 className="section-title">Reservation Details</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date" className="form-label">
                  Date *
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  min={getMinDate()}
                  className={`form-input ${errors.date ? 'error' : ''}`}
                  aria-required="true"
                  aria-describedby={errors.date ? 'date-error' : null}
                />
                {errors.date && (
                  <span id="date-error" className="error-message" role="alert">
                    {errors.date}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="time" className="form-label">
                  Time *
                </label>
                <select
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className={`form-input ${errors.time ? 'error' : ''}`}
                  aria-required="true"
                  aria-describedby={errors.time ? 'time-error' : null}
                >
                  <option value="">Select a time</option>
                  {times.map(time => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                {errors.time && (
                  <span id="time-error" className="error-message" role="alert">
                    {errors.time}
                  </span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="guests" className="form-label">
                  Number of Guests *
                </label>
                <input
                  type="number"
                  id="guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleInputChange}
                  min="1"
                  max="10"
                  className={`form-input ${errors.guests ? 'error' : ''}`}
                  aria-required="true"
                  aria-describedby={errors.guests ? 'guests-error' : 'guests-help'}
                />
                <small id="guests-help" className="form-help">
                  Maximum 10 guests per reservation
                </small>
                {errors.guests && (
                  <span id="guests-error" className="error-message" role="alert">
                    {errors.guests}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="occasion" className="form-label">
                  Occasion
                </label>
                <select
                  id="occasion"
                  name="occasion"
                  value={formData.occasion}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  {occasions.map(occasion => (
                    <option key={occasion} value={occasion}>
                      {occasion}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">Contact Information</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`form-input ${errors.name ? 'error' : ''}`}
                  aria-required="true"
                  aria-describedby={errors.name ? 'name-error' : null}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <span id="name-error" className="error-message" role="alert">
                    {errors.name}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  aria-required="true"
                  aria-describedby={errors.email ? 'email-error' : null}
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <span id="email-error" className="error-message" role="alert">
                    {errors.email}
                  </span>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`form-input ${errors.phone ? 'error' : ''}`}
                aria-required="true"
                aria-describedby={errors.phone ? 'phone-error' : null}
                placeholder="Enter your phone number"
              />
              {errors.phone && (
                <span id="phone-error" className="error-message" role="alert">
                  {errors.phone}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="specialRequests" className="form-label">
                Special Requests
              </label>
              <textarea
                id="specialRequests"
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleInputChange}
                className="form-input form-textarea"
                rows="4"
                placeholder="Any dietary restrictions, allergies, or special requests..."
                aria-describedby="requests-help"
              />
              <small id="requests-help" className="form-help">
                Let us know if you have any special requirements
              </small>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
              aria-describedby="submit-help"
            >
              {isSubmitting ? 'Submitting...' : 'Make Reservation'}
            </button>
            <small id="submit-help" className="form-help">
              * Required fields
            </small>
          </div>
        </form>
      </div>
    </section>
  );
};

export default BookingForm;
