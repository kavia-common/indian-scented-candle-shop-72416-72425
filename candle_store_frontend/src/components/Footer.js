import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container space-between">
        <div className="small">© {new Date().getFullYear()} Aaranya Candles. Crafted in India.</div>
        <div className="small">Made with aromas of sandalwood, jasmine, and chai.</div>
      </div>
    </footer>
  );
}
