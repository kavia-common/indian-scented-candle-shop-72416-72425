import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithProviders, resetStorage } from './test-utils';

jest.mock('../utils/mockApi', () => {
  const original = jest.requireActual('../utils/mockApi');
  return {
    ...original,
    getOrders: jest.fn().mockResolvedValue([
      {
        id: 'ord-abc',
        date: new Date('2023-07-01T12:00:00Z').toISOString(),
        items: [{ id: 'cn-001', qty: 2, price: 19.99 }],
        total: 39.98,
        status: 'Processing',
        paymentLast4: '9876'
      },
      {
        id: 'ord-def',
        date: new Date('2023-07-02T12:00:00Z').toISOString(),
        items: [{ id: 'cn-003', qty: 1, price: 17.0 }],
        total: 17.0,
        status: 'Processing',
        paymentLast4: '4242'
      }
    ]),
  };
});

describe('Orders page', () => {
  beforeEach(() => resetStorage());

  test('renders orders table with rows and payment last4 info', async () => {
    renderWithProviders(<App />, { route: '/orders' });

    await screen.findByRole('table', { name: /Orders/i });
    // Two rows for two orders
    expect(screen.getByText(/ord-abc/i)).toBeInTheDocument();
    expect(screen.getByText(/ord-def/i)).toBeInTheDocument();

    // Payment info summary uses most recent (after reverse in component => ord-def first)
    expect(screen.getByText(/Card ending with 4242/i)).toBeInTheDocument();
  });
});
