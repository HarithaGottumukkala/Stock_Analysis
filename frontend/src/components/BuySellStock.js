import React, { useState } from 'react';
import axios from 'axios';

const BuySellStock = () => {
  const [symbol, setSymbol] = useState('');
  const [action, setAction] = useState('buy');
  const [amount, setAmount] = useState(0);

  // Get base URL from environment variable
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const handleSubmit = async () => {
    try {
      const res = await axios.put(`${API_BASE_URL}/stocks/${symbol}/shares`, {
        action,
        amount: parseInt(amount)
      });

      alert(`${res.data.message}. Total shares now: ${res.data.shares}`);
      setSymbol('');
      setAmount(0);
    } catch (err) {
      alert("Error: " + (err.response?.data?.error || "Unknown error"));
      console.error(err);
    }
  };

  return (
    <div>
      <h3>Buy / Sell Shares</h3>
      <input
        type="text"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        placeholder="Enter stock symbol"
      />
      <select value={action} onChange={(e) => setAction(e.target.value)}>
        <option value="buy">Buy</option>
        <option value="sell">Sell</option>
      </select>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default BuySellStock;
