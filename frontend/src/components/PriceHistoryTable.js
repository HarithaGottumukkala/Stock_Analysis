import React, { useState } from 'react';
import axios from 'axios';

const PriceHistoryTable = () => {
  const [symbol, setSymbol] = useState('');
  const [data, setData] = useState([]);

  const fetchPriceHistory = async () => {
    if (!symbol) return;

    try {
      const res = await axios.get(`http://localhost:5000/api/stocks/${symbol}/chart`);
      const { dates, prices } = res.data;

      const rows = dates.map((date, idx) => ({
        date,
        price: prices[idx]
      }));

      setData(rows);
    } catch (error) {
      alert("❌ Could not fetch price data. Make sure it’s scraped first.");
    }
  };

  return (
    <div>
      <h3>📅 Price History Table</h3>
      <input
        type="text"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
        placeholder="Enter stock symbol"
      />
      <button onClick={fetchPriceHistory}>Fetch</button>

      {data.length > 0 && (
        <table border="1" style={{ marginTop: "10px", width: "300px" }}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Price ($)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.date}</td>
                <td>{row.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PriceHistoryTable;
