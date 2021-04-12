import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Click me to open the prompt, and choose your Slippi folder/i);
  expect(linkElement).toBeInTheDocument();
});
