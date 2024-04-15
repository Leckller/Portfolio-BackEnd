// src/App.test.tsx

import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App.tsx';

it('should show "Super Secret Backend" text', () => {
  render(<App />, { wrapper: BrowserRouter });
  expect(screen.getByText(/Super Secret Backend/i)).toBeInTheDocument();
});
