import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../data/products';
import { useCart } from '../context/CartContext';

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = useMemo(() => getProductById(id), [id]);
  const [size, setSize] = useState(product?.sizes?.[0] || 'Medium');
  const [qty, setQty] = useState(1);
  const { add } = useCart();

  if (!product) return <div className="container"><p>Product not found.</p></div>;

  return (
    <div className="container mt16">
      <div className="product-detail">
        <div className="gallery">
          <div className="card-media" style={{borderRadius:12}}>
            <div className="motif" aria-hidden="true" />
            <div style={{display:'grid',placeItems:'center', width:'100%', height:'100%'}}>
              <span style={{fontSize:80}}>🕯️</span>
            </div>
          </div>
          <div className="small mt8">Fragrance notes: {product.scents.join(', ')}</div>
        </div>
        <div className="detail-pane">
          <h1 className="title-xl">{product.name}</h1>
          <div className="meta mt8">{product.description}</div>
          <div className="price mt12">${product.price.toFixed(2)}</div>

          <div className="hr" />

          <div className="field">
            <div className="label">Size</div>
            <div className="row">
              {product.sizes.map(s => (
                <button
                  key={s}
                  className={`btn ${size === s ? '' : 'ghost'}`}
                  onClick={() => setSize(s)}
                >{s}</button>
              ))}
            </div>
          </div>

          <div className="field mt12">
            <div className="label">Quantity</div>
            <div className="row">
              <button className="btn ghost" onClick={()=>setQty(q=>Math.max(1,q-1))}>-</button>
              <input
                aria-label="Quantity"
                className="input-text"
                style={{width:80, textAlign:'center'}}
                type="number" value={qty}
                onChange={e=>setQty(Math.max(1, parseInt(e.target.value || 1, 10)))}
              />
              <button className="btn ghost" onClick={()=>setQty(q=>Math.min(99,q+1))}>+</button>
            </div>
          </div>

          <div className="row mt16">
            <button className="btn" onClick={() => add(product, { size }, qty)}>Add to Cart</button>
          </div>

          <div className="small mt16">Stock: {product.stock} • Rating: {product.rating}★</div>
        </div>
      </div>
    </div>
  );
}
