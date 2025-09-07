/**
 * Mock API layer to simulate auth and order operations.
 * Replace with real HTTP calls when backend is available.
 */
import { load, save } from './storage';

const LATENCY = 300;

// PUBLIC_INTERFACE
export async function login(email, password) {
  /** Fake login: accepts any non-empty email/password; stores a user profile. */
  await wait();
  if (!email || !password) throw new Error('Missing credentials');
  const user = { id: 'u1', email, name: email.split('@')[0] };
  save('auth', { user, token: 'mock-token' });
  return user;
}

// PUBLIC_INTERFACE
export async function register(name, email, password) {
  /** Fake register: returns a user profile and sets auth. */
  await wait();
  if (!name || !email || !password) throw new Error('Missing fields');
  const user = { id: 'u1', email, name };
  save('auth', { user, token: 'mock-token' });
  return user;
}

// PUBLIC_INTERFACE
export async function logout() {
  /** Clears auth session. */
  await wait();
  save('auth', null);
  return true;
}

// PUBLIC_INTERFACE
export async function placeOrder({ items, total, payment }) {
  /** Stores order into local storage order list. */
  await wait();
  const now = new Date().toISOString();
  const order = {
    id: `ord-${Math.random().toString(36).slice(2,8)}`,
    items,
    total,
    paymentLast4: payment?.card?.slice(-4) || '0000',
    date: now,
    status: 'Processing'
  };
  const history = load('orders', []);
  history.push(order);
  save('orders', history);
  return order;
}

// PUBLIC_INTERFACE
export async function getOrders() {
  /** Returns order history from local storage. */
  await wait();
  return load('orders', []);
}

function wait(ms = LATENCY) {
  return new Promise(res => setTimeout(res, ms));
}
