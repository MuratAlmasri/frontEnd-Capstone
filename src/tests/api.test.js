import { initializeTimes, updateTimes, submitAPI } from '../utils/api';

// Mock the global API functions for testing
const mockFetchAPI = jest.fn();
const mockSubmitAPI = jest.fn();

describe('API Utilities', () => {
  beforeEach(() => {
    // Clear mocks
    mockFetchAPI.mockClear();
    mockSubmitAPI.mockClear();
    
    // Reset global window properties
    delete window.fetchAPI;
    delete window.submitAPI;
  });

  describe('initializeTimes', () => {
    test('returns fallback times when API is not available', () => {
      const times = initializeTimes();
      
      expect(Array.isArray(times)).toBe(true);
      expect(times.length).toBeGreaterThan(0);
      expect(times).toContain('17:00');
      expect(times).toContain('19:00');
      expect(times).toContain('21:00');
    });

    test('calls fetchAPI when available', () => {
      const mockTimes = ['18:00', '19:00', '20:00'];
      mockFetchAPI.mockReturnValue(mockTimes);
      window.fetchAPI = mockFetchAPI;
      
      const times = initializeTimes();
      
      expect(mockFetchAPI).toHaveBeenCalledWith(expect.any(Date));
      expect(times).toEqual(mockTimes);
    });

    test('handles API errors gracefully', () => {
      mockFetchAPI.mockImplementation(() => {
        throw new Error('API Error');
      });
      window.fetchAPI = mockFetchAPI;
      
      const times = initializeTimes();
      
      // Should fall back to default times
      expect(Array.isArray(times)).toBe(true);
      expect(times.length).toBeGreaterThan(0);
    });
  });

  describe('updateTimes', () => {
    test('returns fallback times when API is not available', () => {
      const testDate = '2025-09-15';
      const times = updateTimes(testDate);
      
      expect(Array.isArray(times)).toBe(true);
      expect(times.length).toBeGreaterThan(0);
    });

    test('calls fetchAPI with correct date when available', () => {
      const mockTimes = ['17:30', '18:30', '19:30'];
      const testDate = '2025-09-15';
      mockFetchAPI.mockReturnValue(mockTimes);
      window.fetchAPI = mockFetchAPI;
      
      const times = updateTimes(testDate);
      
      expect(mockFetchAPI).toHaveBeenCalledWith(new Date(testDate));
      expect(times).toEqual(mockTimes);
    });

    test('handles Date objects correctly', () => {
      const mockTimes = ['17:30', '18:30', '19:30'];
      const testDate = new Date('2025-09-15');
      mockFetchAPI.mockReturnValue(mockTimes);
      window.fetchAPI = mockFetchAPI;
      
      const times = updateTimes(testDate);
      
      expect(mockFetchAPI).toHaveBeenCalledWith(testDate);
      expect(times).toEqual(mockTimes);
    });
  });

  describe('submitAPI', () => {
    test('returns true when API is not available (simulation)', async () => {
      const formData = {
        date: '2025-09-15',
        time: '19:00',
        guests: 2,
        name: 'Test User',
        email: 'test@example.com',
        phone: '1234567890'
      };
      
      const result = await submitAPI(formData);
      
      expect(result).toBe(true);
    });

    test('calls submitAPI when available', async () => {
      const formData = {
        date: '2025-09-15',
        time: '19:00',
        guests: 2,
        name: 'Test User',
        email: 'test@example.com',
        phone: '1234567890'
      };
      
      mockSubmitAPI.mockResolvedValue(true);
      window.submitAPI = mockSubmitAPI;
      
      const result = await submitAPI(formData);
      
      expect(mockSubmitAPI).toHaveBeenCalledWith(formData);
      expect(result).toBe(true);
    });

    test('handles API submission errors gracefully', async () => {
      const formData = {
        date: '2025-09-15',
        time: '19:00',
        guests: 2,
        name: 'Test User',
        email: 'test@example.com',
        phone: '1234567890'
      };
      
      mockSubmitAPI.mockImplementation(() => {
        throw new Error('Submission failed');
      });
      window.submitAPI = mockSubmitAPI;
      
      const result = await submitAPI(formData);
      
      // Should fall back to simulation
      expect(result).toBe(true);
    });
  });
});
