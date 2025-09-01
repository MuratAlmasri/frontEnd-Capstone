// API utilities for Little Lemon booking system

/**
 * Initialize available times for today
 * @returns {string[]} Array of available time slots
 */
export const initializeTimes = () => {
  try {
    // Check if the API is available
    if (window.fetchAPI && typeof window.fetchAPI === 'function') {
      return window.fetchAPI(new Date());
    }
  } catch (error) {
    console.warn('fetchAPI not available, using fallback times:', error);
  }
  
  // Fallback times if API is not available
  return [
    '17:00', '17:30', '18:00', '18:30', '19:00', 
    '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'
  ];
};

/**
 * Update available times for a specific date
 * @param {string|Date} date - The selected date
 * @returns {string[]} Array of available time slots for the date
 */
export const updateTimes = (date) => {
  try {
    // Check if the API is available
    if (window.fetchAPI && typeof window.fetchAPI === 'function') {
      const selectedDate = date instanceof Date ? date : new Date(date);
      return window.fetchAPI(selectedDate);
    }
  } catch (error) {
    console.warn('fetchAPI not available for date update, using fallback times:', error);
  }
  
  // Return fallback times if API is not available
  return initializeTimes();
};

/**
 * Submit a reservation (placeholder for future API integration)
 * @param {Object} formData - The reservation data
 * @returns {Promise<boolean>} Success status
 */
export const submitAPI = async (formData) => {
  try {
    // Check if the submit API is available
    if (window.submitAPI && typeof window.submitAPI === 'function') {
      return window.submitAPI(formData);
    }
  } catch (error) {
    console.warn('submitAPI not available:', error);
  }
  
  // Simulate successful submission for now
  console.log('Simulating form submission:', formData);
  return new Promise(resolve => {
    setTimeout(() => resolve(true), 1000);
  });
};
