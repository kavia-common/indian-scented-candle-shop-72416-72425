import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import { renderWithProviders, resetStorage } from './test-utils';

describe('Product detail interactions', () => {
  beforeEach(() => resetStorage());

  test('change size and quantity then add to cart updates header badge and cart page', () => {
    renderWithProviders(<App />, { route: '/product/cn-002' }); // Monsoon Jasmine

    // Ensure product detail loaded
    expect(screen.getByText(/Monsoon Jasmine/i)).toBeInTheDocument();

    // Change size to Large (exists for cn-002)
    fireEvent.click(screen.getByRole('button', { name: 'Large' }));

    // Increase quantity to 3
    const qtyInput = screen.getByLabelText(/Quantity/i);
    fireEvent.change(qtyInput, { target: { value: '3' } });

    // Add to cart
    fireEvent.click(screen.getByRole('button', { name: /Add to Cart/i }));

    // Header badge should show 3
    expect(screen.getByText('3')).toBeInTheDocument();

    // Navigate to cart
    fireEvent.click(screen.getByRole('link', { name: /Cart/i }));
    // Verify item in cart with correct size and qty
    expect(screen.getByText(/Monsoon Jasmine/i)).toBeInTheDocument();
    expect(screen.getByText('Large')).toBeInTheDocument();
    // The qty input in the row should reflect 3
    const qtyField = screen.getAllByRole('spinbutton')[0];
    expect(qtyField).toHaveValue(3);
  });

  test('handles non-existing product id', () => {
    renderWithProviders(<App />, { route: '/product/does-not-exist' });
    expect(screen.getByText(/Product not found/i)).toBeInTheDocument();
  });
});
