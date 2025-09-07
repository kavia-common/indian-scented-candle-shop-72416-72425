import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import { renderWithProviders, resetStorage } from './test-utils';

// Mock login/register/logout to be fast and predictable
jest.mock('../utils/mockApi', () => {
  const original = jest.requireActual('../utils/mockApi');
  return {
    ...original,
    login: jest.fn().mockImplementation(async (email, password) => {
      if (!email || !password) throw new Error('Missing credentials');
      return { id: 'u1', email, name: 'TestUser' };
    }),
    register: jest.fn().mockImplementation(async (name, email, password) => {
      if (!name || !email || !password) throw new Error('Missing fields');
      return { id: 'u2', email, name };
    }),
    logout: jest.fn().mockResolvedValue(true),
  };
});

import { login, register, logout } from '../utils/mockApi';

describe('Authentication flows', () => {
  beforeEach(() => {
    resetStorage();
    jest.clearAllMocks();
  });

  test('login updates header to show user and orders/logout', async () => {
    renderWithProviders(<App />, { route: '/login' });

    fireEvent.change(screen.getByLabelText(/^Email$/i), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'secret' } });
    fireEvent.click(screen.getByRole('button', { name: /Sign in/i }));

    await waitFor(() => expect(login).toHaveBeenCalled());

    // Navigated to home
    await screen.findByRole('link', { name: /Orders/i });
    expect(screen.getByText(/Hi,/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Logout/i })).toBeInTheDocument();
  });

  test('register updates header and navigates home', async () => {
    renderWithProviders(<App />, { route: '/register' });

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Asha' } });
    fireEvent.change(screen.getByLabelText(/^Email$/i), { target: { value: 'asha@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'secret' } });
    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    await waitFor(() => expect(register).toHaveBeenCalled());

    await screen.findByRole('link', { name: /Orders/i });
    expect(screen.getByText(/Hi,/i)).toBeInTheDocument();
  });

  test('logout clears session and shows login/register again', async () => {
    // Seed as logged in by going through login
    resetStorage();
    renderWithProviders(<App />, { route: '/login' });
    fireEvent.change(screen.getByLabelText(/^Email$/i), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'secret' } });
    fireEvent.click(screen.getByRole('button', { name: /Sign in/i }));
    await screen.findByRole('link', { name: /Orders/i });

    // Click logout in header
    fireEvent.click(screen.getByRole('button', { name: /Logout/i }));
    await waitFor(() => expect(logout).toHaveBeenCalled());

    // Now header should show Login/Register
    expect(screen.getByRole('link', { name: /Login/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Register/i })).toBeInTheDocument();
  });
});
