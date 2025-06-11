// src/components/StockList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StockList = ({ refresh }) => {
  const [stocks, setStocks] = useState([]);

  // Get backend base URL from environment variable
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const fetchStocks = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/stocks`);
      setStocks(res.data);
    } catch (err) {
      console.error("Failed to fetch stocks:", err);
    }
  };

  useEffect(() => {
    fetchStocks();
  }, [refresh]);

  const deleteStock = async (symbol) => {
    try {
      await axios.delete(`${API_BASE_URL}/stocks/${symbol}`);
      fetchStocks(); // Refresh list after deletion
    } catch (err) {
      console.error(`Failed to delete ${symbol}:`, err);
    }
  };

  return (
    <div>
      <h3>Stock Portfolio</h3>
      <ul>
        {stocks.map((stock) => (
          <li key={stock.id}>
            {stock.symbol}
            <button
              onClick={() => deleteStock(stock.symbol)}
              style={{ marginLeft: '10px' }}
            >
              ❌ Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockList;
