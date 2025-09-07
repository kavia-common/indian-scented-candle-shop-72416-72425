import React, { useEffect, useState } from 'react';
import { getOrders } from '../utils/mockApi';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    (async () => {
      setLoading(true);
      const res = await getOrders();
      setOrders(res.reverse());
      setLoading(false);
    })();
  }, []);

  return (
    <div className="container mt16">
      <h2 className="title-lg">Order History</h2>
      {loading ? <p>Loading...</p> : (
        orders.length === 0 ? <p className="small">No orders yet.</p> : (
          <div className="mt12">
            <table className="table" aria-label="Orders">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o.id}>
                    <td>{o.id}</td>
                    <td>{new Date(o.date).toLocaleString()}</td>
                    <td>{o.items.reduce((s,i)=>s+i.qty,0)}</td>
                    <td>${o.total.toFixed(2)}</td>
                    <td>{o.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="small mt8">Payments processed • Card ending with {orders[0]?.paymentLast4 || '0000'}</div>
          </div>
        )
      )}
    </div>
  );
}
