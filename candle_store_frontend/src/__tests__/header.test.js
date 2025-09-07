import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import Header from '../components/Header';
import { CartProvider } from '../context/CartContext';
import { AuthProvider } from '../context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import { resetStorage } from './test-utils';

// Helper to render Header with providers
function renderHeader(props = {}) {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Header {...props} />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

describe('Header', () => {
  beforeEach(() => {
    resetStorage(); // ensure clean storage
  });

  test('renders brand and navigation links', () => {
    const { container } = require('@testing-library/react').render(renderHeader());
    expect(screen.getByText(/Aaranya/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /All Products/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Cart/i })).toBeInTheDocument();
  });

  test('shows Login/Register when unauthenticated', () => {
    const { container } = require('@testing-library/react').render(renderHeader());
    expect(screen.getByRole('link', { name: /Login/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Register/i })).toBeInTheDocument();
  });

  test('search input calls onSearch with user text', () => {
    const onSearch = jest.fn();
    const { container } = require('@testing-library/react').render(renderHeader({ onSearch }));
    const input = screen.getByRole('searchbox');
    fireEvent.change(input, { target: { value: 'jasmine' } });
    expect(onSearch).toHaveBeenCalledWith('jasmine');
  });

  test('cart badge shows total quantity from cart', () => {
    // seed cart with 2 items qty 1 and 3
    resetStorage({
      cart: [
        { key: 'cn-001:Medium', id: 'cn-001', name: 'Sandalwood Serenity', price: 19.99, size: 'Medium', qty: 1 },
        { key: 'cn-003:Small', id: 'cn-003', name: 'Masala Chai Glow', price: 17, size: 'Small', qty: 3 }
      ],
      auth: null
    });
    const { container } = require('@testing-library/react').render(renderHeader());
    const badge = screen.getByText('4'); // 1 + 3
    expect(badge).toBeInTheDocument();
  });
});
