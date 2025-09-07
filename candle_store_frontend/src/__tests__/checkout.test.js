import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import { renderWithProviders, resetStorage } from './test-utils';

// Mock the API layer we depend on for orders
jest.mock('../utils/mockApi', () => {
  const actual = jest.requireActual('../utils/mockApi');
  return {
    ...actual,
    placeOrder: jest.fn().mockResolvedValue({
      id: 'ord-123abc',
      date: new Date().toISOString(),
      items: [],
      total: 42.42,
      paymentLast4: '4242',
      status: 'Processing'
    }),
  };
});
import { placeOrder } from '../utils/mockApi';

function seedCart() {
  resetStorage({
    cart: [{ key: 'cn-002:Large', id: 'cn-002', name: 'Monsoon Jasmine', price: 24.5, size: 'Large', qty: 2 }],
    auth: null
  });
}

describe('Checkout flow', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('shows validation error when fields invalid', async () => {
    seedCart();
    renderWithProviders(<App />, { route: '/checkout' });

    // Submit with empty fields
    fireEvent.click(screen.getByRole('button', { name: /Pay/i }));
    expect(await screen.findByRole('alert')).toHaveTextContent(/Please fill all fields/i);
  });

  test('successful payment calls placeOrder, clears cart, and navigates to orders', async () => {
    seedCart();
    renderWithProviders(<App />, { route: '/checkout' });

    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Asha Candlelover' } });
    fireEvent.change(screen.getByLabelText(/^Email$/i), { target: { value: 'asha@example.com' } });
    fireEvent.change(screen.getByLabelText(/Shipping Address/i), { target: { value: '221B Candlestick Way' } });
    fireEvent.change(screen.getByLabelText(/Card Number/i), { target: { value: '4242 4242 4242 4242' } });

    fireEvent.click(screen.getByRole('button', { name: /Pay/i }));

    await waitFor(() => expect(placeOrder).toHaveBeenCalled());

    // After success, should navigate to Orders page
    await screen.findByText(/Order History/i);
    // The cart badge should be 0 now (cleared)
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  test('checkout page for empty cart prompts to browse', () => {
    resetStorage({ cart: [] });
    renderWithProviders(<App />, { route: '/checkout' });

    expect(screen.getByText(/Your cart is empty/i)).toBeInTheDocument();
  });
});
