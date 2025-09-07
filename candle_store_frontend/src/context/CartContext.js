import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { load, save } from '../utils/storage';

const CartCtx = createContext(null);

// PUBLIC_INTERFACE
export function useCart() {
  /** Access cart state and actions: items, add, remove, update, clear, totals. */
  return useContext(CartCtx);
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => load('cart', []));

  useEffect(() => { save('cart', items); }, [items]);

  const add = (product, options = { size: 'Medium' }, qty = 1) => {
    setItems(prev => {
      const key = `${product.id}:${options.size}`;
      const existing = prev.find(i => i.key === key);
      if (existing) {
        return prev.map(i => i.key === key ? { ...i, qty: Math.min(i.qty + qty, 99) } : i);
      }
      return [...prev, {
        key,
        id: product.id,
        name: product.name,
        price: product.price,
        size: options.size,
        qty
      }];
    });
  };

  const remove = (key) => setItems(prev => prev.filter(i => i.key !== key));
  const updateQty = (key, qty) => setItems(prev => prev.map(i => i.key === key ? { ...i, qty: Math.max(1, Math.min(99, qty || 1)) } : i));
  const clear = () => setItems([]);

  const totals = useMemo(() => {
    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
    const shipping = items.length > 0 ? 4.99 : 0;
    const tax = +(subtotal * 0.08).toFixed(2);
    const total = +(subtotal + shipping + tax).toFixed(2);
    return { subtotal: +subtotal.toFixed(2), shipping, tax, total };
  }, [items]);

  const value = { items, add, remove, updateQty, clear, totals };

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}
