<<<<<<< HEAD
import React from 'react'
import { render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom'

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Home Screen/i);
=======
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
>>>>>>> 13b99110 (Initialize project using Create React App)
  expect(linkElement).toBeInTheDocument();
});
