import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { placeOrder } from '../utils/mockApi';
import { useNavigate } from 'react-router-dom';

export default function CheckoutPage() {
  const { items, totals, clear } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:'', email:'', address:'', card:'' });
  const [status, setStatus] = useState({ loading:false, error:'' });

  if (items.length === 0) {
    return (
      <div className="container mt16">
        <p>Your cart is empty.</p>
        <button className="btn" onClick={()=>navigate('/')}>Browse products</button>
      </div>
    );
  }

  const update = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  async function submit(e) {
    e.preventDefault();
    setStatus({ loading:true, error:'' });
    try {
      // Very basic validation
      if (!form.name || !form.email || !form.address || !form.card || form.card.replace(/\s/g,'').length < 12) {
        throw new Error('Please fill all fields with valid information.');
      }
      const order = await placeOrder({ items, total: totals.total, payment: { card: form.card }});
      clear();
      navigate(`/orders?placed=${order.id}`);
    } catch (err) {
      setStatus({ loading:false, error: err.message || 'Payment failed' });
      return;
    }
  }

  return (
    <div className="container mt16">
      <h2 className="title-lg">Checkout</h2>
      <div className="mt12" style={{display:'grid', gridTemplateColumns:'1fr 360px', gap:16}}>
        <form className="form" onSubmit={submit}>
          <div className="field">
            <label className="label">Full Name</label>
            <input className="input-text" value={form.name} onChange={e=>update('name', e.target.value)} required />
          </div>
          <div className="field">
            <label className="label">Email</label>
            <input className="input-text" type="email" value={form.email} onChange={e=>update('email', e.target.value)} required />
          </div>
          <div className="field">
            <label className="label">Shipping Address</label>
            <textarea className="input-text" rows="3" value={form.address} onChange={e=>update('address', e.target.value)} required />
          </div>
          <div className="field">
            <label className="label">Card Number</label>
            <input className="input-text" placeholder="4242 4242 4242 4242" value={form.card} onChange={e=>update('card', e.target.value)} required />
          </div>
          {status.error && <div className="small" style={{color:'var(--color-danger)'}} role="alert">{status.error}</div>}
          <button className="btn" disabled={status.loading} type="submit">
            {status.loading ? 'Processing...' : `Pay $${totals.total.toFixed(2)}`}
          </button>
        </form>

        <div className="summary">
          <h3 className="title-lg">Order Summary</h3>
          {items.map(i => (
            <div key={i.key} className="space-between mt8">
              <span>{i.name} · {i.size} × {i.qty}</span>
              <span>${(i.qty * i.price).toFixed(2)}</span>
            </div>
          ))}
          <div className="hr" />
          <div className="space-between"><span>Subtotal</span><strong>${totals.subtotal.toFixed(2)}</strong></div>
          <div className="space-between mt8"><span>Shipping</span><span>${totals.shipping.toFixed(2)}</span></div>
          <div className="space-between mt8"><span>Tax</span><span>${totals.tax.toFixed(2)}</span></div>
          <div className="hr" />
          <div className="space-between"><span>Total</span><strong>${totals.total.toFixed(2)}</strong></div>
        </div>
      </div>
    </div>
  );
}
