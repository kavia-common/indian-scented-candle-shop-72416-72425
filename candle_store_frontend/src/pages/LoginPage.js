import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email:'', password:'' });
  const [error, setError] = useState('');

  async function submit(e) {
    e.preventDefault();
    setError('');
    try {
      await login(form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  }

  return (
    <div className="container mt16">
      <h2 className="title-lg">Login</h2>
      <form className="form mt12" onSubmit={submit}>
        <div className="field">
          <label className="label">Email</label>
          <input className="input-text" type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required />
        </div>
        <div className="field">
          <label className="label">Password</label>
          <input className="input-text" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} required />
        </div>
        {error && <div className="small" style={{color:'var(--color-danger)'}} role="alert">{error}</div>}
        <button className="btn" type="submit">Sign in</button>
        <div className="small">No account? <Link to="/register">Register</Link></div>
      </form>
    </div>
  );
}
