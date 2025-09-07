import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { items, updateQty, remove, totals } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="container mt16">
        <h2 className="title-lg">Your cart is empty</h2>
        <p className="small">Browse our aromatic candles and add your favorites.</p>
        <Link className="btn mt12" to="/">Browse products</Link>
      </div>
    );
  }

  return (
    <div className="container mt16">
      <h2 className="title-lg">Your Cart</h2>
      <div className="mt12" style={{display:'grid', gridTemplateColumns:'1fr 320px', gap:16}}>
        <div>
          <table className="table" aria-label="Cart items">
            <thead>
              <tr>
                <th>Item</th>
                <th>Size</th>
                <th>Qty</th>
                <th>Price</th>
                <th aria-label="actions" />
              </tr>
            </thead>
            <tbody>
              {items.map(i => (
                <tr key={i.key}>
                  <td>{i.name}</td>
                  <td>{i.size}</td>
                  <td>
                    <input
                      className="input-text"
                      style={{width:80}}
                      type="number"
                      min="1" max="99"
                      value={i.qty}
                      onChange={e=>updateQty(i.key, parseInt(e.target.value || 1,10))}
                    />
                  </td>
                  <td>${(i.price * i.qty).toFixed(2)}</td>
                  <td>
                    <button className="btn ghost" onClick={()=>remove(i.key)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link className="btn ghost mt12" to="/">Continue shopping</Link>
        </div>
        <div className="summary">
          <h3 className="title-lg">Order Summary</h3>
          <div className="space-between mt12"><span>Subtotal</span><strong>${totals.subtotal.toFixed(2)}</strong></div>
          <div className="space-between mt8"><span>Shipping</span><span>${totals.shipping.toFixed(2)}</span></div>
          <div className="space-between mt8"><span>Tax</span><span>${totals.tax.toFixed(2)}</span></div>
          <div className="hr" />
          <div className="space-between"><span>Total</span><strong>${totals.total.toFixed(2)}</strong></div>
          <button className="btn block mt16" onClick={()=>navigate('/checkout')}>Checkout</button>
        </div>
      </div>
    </div>
  );
}
