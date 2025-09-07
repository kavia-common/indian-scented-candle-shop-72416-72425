import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Header({ onSearch }) {
  const { items } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const totalQty = items.reduce((s, i) => s + i.qty, 0);

  return (
    <header className="header">
      <div className="container">
        <div className="header-top">
          <Link to="/" className="brand">
            <div className="brand-mark" aria-hidden="true" />
            <div className="brand-title">
              <div className="m0">Aaranya <span>Candles</span></div>
              <div className="small">Indian Scented Candles</div>
            </div>
          </Link>
          <div className="header-actions">
            {isAuthenticated ? (
              <>
                <span className="small">Hi, {user?.name}</span>
                <Link className="btn ghost" to="/orders">Orders</Link>
                <button className="btn ghost" onClick={async () => { await logout(); navigate('/'); }}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className="btn ghost" to="/login">Login</Link>
                <Link className="btn secondary" to="/register">Register</Link>
              </>
            )}
            <Link className="btn" to="/cart" aria-label="View cart">
              Cart <span className="badge" aria-live="polite">{totalQty}</span>
            </Link>
          </div>
        </div>

        <div className="searchbar">
          <label className="input" aria-label="Search products">
            <span role="img" aria-label="search">🔎</span>
            <input type="search" placeholder="Search candles (e.g., sandalwood, jasmine, chai)" onChange={(e)=>onSearch?.(e.target.value)} />
          </label>
          <Link to="/" className="btn ghost">All Products</Link>
        </div>
      </div>
      <div style="height:2px;background:linear-gradient(90deg,var(--color-accent),var(--color-primary));opacity:.25"></div>
    </header>
  );
}
