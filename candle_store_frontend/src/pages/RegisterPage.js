import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:'', email:'', password:'' });
  const [error, setError] = useState('');

  async function submit(e) {
    e.preventDefault();
    setError('');
    try {
      await register(form.name, form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Registration failed');
    }
  }

  return (
    <div className="container mt16">
      <h2 className="title-lg">Create Account</h2>
      <form className="form mt12" onSubmit={submit}>
        <div className="field">
          <label className="label">Name</label>
          <input className="input-text" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
        </div>
        <div className="field">
          <label className="label">Email</label>
          <input className="input-text" type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required />
        </div>
        <div className="field">
          <label className="label">Password</label>
          <input className="input-text" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} required />
        </div>
        {error && <div className="small" style={{color:'var(--color-danger)'}} role="alert">{error}</div>}
        <button className="btn" type="submit">Register</button>
        <div className="small">Already have an account? <Link to="/login">Login</Link></div>
      </form>
    </div>
  );
}
