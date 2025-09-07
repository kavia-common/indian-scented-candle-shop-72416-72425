import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import { renderWithProviders, resetStorage } from './test-utils';

function seedCart() {
  resetStorage({
    cart: [
      { key: 'cn-001:Medium', id: 'cn-001', name: 'Sandalwood Serenity', price: 19.99, size: 'Medium', qty: 2 },
      { key: 'cn-003:Small', id: 'cn-003', name: 'Masala Chai Glow', price: 17.0, size: 'Small', qty: 1 }
    ],
    auth: null
  });
}

describe('Cart management', () => {
  test('update quantity and remove item recalculates totals', () => {
    seedCart();
    renderWithProviders(<App />, { route: '/cart' });

    // Verify initial totals: subtotal = 19.99*2 + 17*1 = 56.98
    expect(screen.getByText('$56.98')).toBeInTheDocument(); // subtotal
    // Shipping 4.99, tax 8% of 56.98 = 4.56, total = 56.98+4.99+4.56=66.53
    expect(screen.getByText('$4.99')).toBeInTheDocument();
    expect(screen.getByText('$4.56')).toBeInTheDocument();
    expect(screen.getByText('$66.53')).toBeInTheDocument();

    // Change qty of first item (spinbutton) to 3
    const qtyInputs = screen.getAllByRole('spinbutton');
    fireEvent.change(qtyInputs[0], { target: { value: '3' } });

    // Subtotal becomes 19.99*3 + 17*1 = 76.97
    expect(screen.getByText('$76.97')).toBeInTheDocument();

    // Remove second item
    const removeButtons = screen.getAllByRole('button', { name: /Remove/i });
    fireEvent.click(removeButtons[1]);

    // Now only Sandalwood 3*19.99 = 59.97 => subtotal 59.97
    expect(screen.getByText('$59.97')).toBeInTheDocument();
  });

  test('checkout button navigates to checkout page', () => {
    seedCart();
    renderWithProviders(<App />, { route: '/cart' });

    fireEvent.click(screen.getByRole('button', { name: /Checkout/i }));
    expect(screen.getByText(/Checkout/i)).toBeInTheDocument();
    // Ensure summary is present on checkout
    expect(screen.getByText(/Order Summary/i)).toBeInTheDocument();
  });

  test('empty cart shows empty state with link', () => {
    resetStorage({ cart: [] });
    renderWithProviders(<App />, { route: '/cart' });

    expect(screen.getByText(/Your cart is empty/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Browse products/i })).toBeInTheDocument();
  });
});
