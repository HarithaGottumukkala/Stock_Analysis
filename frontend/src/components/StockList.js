// src/components/StockList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StockList = ({ refresh }) => {
  const [stocks, setStocks] = useState([]);

  const fetchStocks = async () => {
    const res = await axios.get('process.env.REACT_APP_API_BASE_URL/stocks');
    setStocks(res.data);
  };

  useEffect(() => {
    fetchStocks();
  }, [refresh]);

  const deleteStock = async (symbol) => {
    await axios.delete(`process.env.REACT_APP_API_BASE_URL/stocks/${symbol}`);
    fetchStocks();
  };

  return (
    <div>
      <h3>Stock Portfolio</h3>
      <ul>
        {stocks.map((stock) => (
          <li key={stock.id}>
            {stock.symbol}
            <button onClick={() => deleteStock(stock.symbol)} style={{ marginLeft: '10px' }}>❌ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockList;
