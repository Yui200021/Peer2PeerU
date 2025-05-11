import React, { useEffect, useState } from 'react';
import './Transactions.css';

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {

    fetch('http://127.0.0.1:8000/api/transactions')

      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .catch((err) => console.error('Error fetching transactions:', err));
  }, []);


  const filteredTransactions = transactions.filter((tx) =>
    tx.ItemName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home-container">
      {/* Left side illustration */}
      <div className="home-left">
        <img
          src="/assets/transaction-cover.png"
          alt="Transactions"
          className="home-cover-img"
        />
      </div>

      {/* Right side content */}
      <div className="home-right">
        {/* Search bar */}
        <div className="search-bar">
          <input
            type="text"
            className="home-search-input"
            placeholder="Search by item name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="search-button" onClick={() => { }}>
            Search
          </button>
        </div>

        {/* Transaction list */}
        <div className="featured-listings">
          <h2>Transaction History</h2>
          <div className="items-grid">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((tx) => (
                <div key={tx.transactionId} className="item-card">
                  <p><strong>Item:</strong> {tx.ItemName}</p>
                  <p><strong>Buyer:</strong> {tx.BuyerFirstName} {tx.BuyerLastName}</p>
                  <p><strong>Seller:</strong> {tx.SellerFirstName} {tx.SellerLastName}</p>
                  <p><strong>Amount:</strong> ${parseFloat(tx.transactionAmount).toFixed(2)}</p>
                  <p><strong>Date:</strong> {new Date(tx.transactionDate).toLocaleDateString()}</p>
                </div>
              ))
            ) : (
              <p style={{ color: '#ccc' }}>No transactions found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
