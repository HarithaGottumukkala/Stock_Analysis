// src/components/AddStock.js
import React, { useState } from 'react';
import axios from 'axios';

const AddStock = ({ onAdd }) => {
  const [symbol, setSymbol] = useState('');

  const handleAddStock = async () => {
    if (!symbol) return alert("Please enter a stock symbol");

    try {
      await axios.post('process.env.REACT_APP_API_BASE_URL/stocks', { symbol });
      alert(`Stock ${symbol} added successfully`);
      setSymbol('');
      onAdd();  // notify parent to refresh stock list
    } catch (error) {
      alert("Error adding stock. Maybe it already exists?");
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Add Stock</h3>
      <input
        type="text"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        placeholder="Enter stock symbol (e.g., MSFT)"
      />
      <button onClick={handleAddStock}>Add</button>
    </div>
  );
};

export default AddStock;
