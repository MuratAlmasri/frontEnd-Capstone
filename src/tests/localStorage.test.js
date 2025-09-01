// localStorage.test.js
import { render, screen } from '@testing-library/react';

// Utility functions for localStorage
export function writeToLocalStorage(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function readFromLocalStorage(key) {
  const value = window.localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
}

describe('localStorage utilities', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test('writes to localStorage', () => {
    writeToLocalStorage('testKey', { foo: 'bar' });
    expect(window.localStorage.getItem('testKey')).toBe(JSON.stringify({ foo: 'bar' }));
  });

  test('reads from localStorage', () => {
    window.localStorage.setItem('testKey', JSON.stringify({ foo: 'bar' }));
    expect(readFromLocalStorage('testKey')).toEqual({ foo: 'bar' });
  });

  test('returns null for missing key', () => {
    expect(readFromLocalStorage('missingKey')).toBeNull();
  });
});
