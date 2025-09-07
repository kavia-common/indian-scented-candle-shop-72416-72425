import React, { useMemo, useState } from 'react';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';
import Filters from '../components/Filters';

export default function ProductsPage({ query }) {
  const [filters, setFilters] = useState({
    scents: [],
    sizes: [],
    price: { max20: false, between20and25: false, above25: false }
  });

  const filtered = useMemo(() => {
    let list = PRODUCTS;

    // search
    const q = (query || '').trim().toLowerCase();
    if (q) {
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.scents.some(s => s.toLowerCase().includes(q))
      );
    }

    // filters
    if (filters.scents.length) {
      list = list.filter(p => p.scents.some(s => filters.scents.includes(s)));
    }
    if (filters.sizes.length) {
      list = list.filter(p => p.sizes.some(s => filters.sizes.includes(s)));
    }
    const priceChecks = [];
    if (filters.price.max20) priceChecks.push(p => p.price < 20);
    if (filters.price.between20and25) priceChecks.push(p => p.price >= 20 && p.price <= 25);
    if (filters.price.above25) priceChecks.push(p => p.price > 25);
    if (priceChecks.length) {
      list = list.filter(p => priceChecks.some(fn => fn(p)));
    }

    return list;
  }, [query, filters]);

  return (
    <div className="container main-grid">
      <Filters filters={filters} setFilters={setFilters} />
      <section>
        <div className="space-between">
          <h2 className="title-lg">Candles</h2>
          <div className="small">{filtered.length} products</div>
        </div>
        <div className="grid mt12">
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}
