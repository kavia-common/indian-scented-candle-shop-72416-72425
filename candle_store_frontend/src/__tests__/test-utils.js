import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { CartProvider } from '../context/CartContext';
import { AuthProvider } from '../context/AuthContext';

// Utility to clear and seed localStorage with the app namespace keys.
export function resetStorage(seed = {}) {
  window.localStorage.clear();
  Object.entries(seed).forEach(([k, v]) => {
    window.localStorage.setItem(`candle_shop_v1:${k}`, JSON.stringify(v));
  });
}

// Render with providers and router for integration-like tests
export function renderWithProviders(ui, { route = '/', ...options } = {}) {
  window.history.pushState({}, 'Test page', route);
  return render(
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>{ui}</CartProvider>
      </AuthProvider>
    </BrowserRouter>,
    options
  );
}
