import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './theme.css';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OrdersPage from './pages/OrdersPage';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

// PUBLIC_INTERFACE
function App() {
  /** Root app with routing and providers for cart and auth. */
  const [query, setQuery] = useState('');

  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Header onSearch={setQuery} />
          <Routes>
            <Route path="/" element={<ProductsPage query={query} />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
          <Footer />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
