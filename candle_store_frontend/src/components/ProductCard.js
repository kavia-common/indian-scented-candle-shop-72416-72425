import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <article className="card" aria-label={`${product.name} candle`}>
      <Link to={`/product/${product.id}`} className="card-media">
        <div className="motif" aria-hidden="true" />
        <div style={{display:'grid',placeItems:'center', width:'100%', height:'100%'}}>
          <span style={{fontSize:48}}>🕯️</span>
        </div>
      </Link>
      <div className="card-body">
        <h3 className="title-lg">{product.name}</h3>
        <div className="meta">{product.scents.join(' • ')}</div>
        <div className="space-between">
          <div className="price">${product.price.toFixed(2)}</div>
          <Link className="btn ghost" to={`/product/${product.id}`}>View</Link>
        </div>
      </div>
    </article>
  );
}
