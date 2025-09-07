import React from 'react';
import { SCENTS, SIZES } from '../data/products';

export default function Filters({ filters, setFilters }) {
  const toggle = (group, value) => {
    const current = new Set(filters[group]);
    current.has(value) ? current.delete(value) : current.add(value);
    setFilters({ ...filters, [group]: Array.from(current) });
  };

  return (
    <aside className="sidebar" aria-label="Product filters">
      <div className="filter-group">
        <div className="filter-title">Scents</div>
        {SCENTS.map(s => (
          <label className="checkbox" key={s}>
            <input type="checkbox" checked={filters.scents.includes(s)} onChange={()=>toggle('scents', s)} />
            <span>{s}</span>
          </label>
        ))}
      </div>
      <div className="filter-group">
        <div className="filter-title">Sizes</div>
        {SIZES.map(sz => (
          <label className="checkbox" key={sz}>
            <input type="checkbox" checked={filters.sizes.includes(sz)} onChange={()=>toggle('sizes', sz)} />
            <span>{sz}</span>
          </label>
        ))}
      </div>
      <div className="filter-group">
        <div className="filter-title">Price</div>
        <label className="checkbox">
          <input type="checkbox" checked={filters.price.max20} onChange={e=>setFilters({...filters, price:{...filters.price, max20: e.target.checked}})} />
          <span>Under $20</span>
        </label>
        <label className="checkbox">
          <input type="checkbox" checked={filters.price.between20and25} onChange={e=>setFilters({...filters, price:{...filters.price, between20and25: e.target.checked}})} />
          <span>$20 - $25</span>
        </label>
        <label className="checkbox">
          <input type="checkbox" checked={filters.price.above25} onChange={e=>setFilters({...filters, price:{...filters.price, above25: e.target.checked}})} />
          <span>Above $25</span>
        </label>
      </div>
    </aside>
  );
}
