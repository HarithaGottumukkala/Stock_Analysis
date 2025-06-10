import React, { useState } from 'react';
import axios from 'axios';

const CSVManager = () => {
  const [symbol, setSymbol] = useState('');

  const handleDownload = async () => {
    if (!symbol) return alert('Please enter a stock symbol');

    try {
      const res = await axios.get(`process.env.REACT_APP_API_BASE_URL/stocks/${symbol}/export`, {
        responseType: 'blob', // Important for file download
      });

      const blob = new Blob([res.data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${symbol}_prices.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      alert('❌ Failed to download CSV.');
    }
  };

  return (
    <div className="csv-manager">
      <h3>📤 Export Stock Price CSV</h3>
      <input
        placeholder="Enter stock symbol (e.g. MSFT)"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
      />
      <button onClick={handleDownload}>Export CSV</button>
    </div>
  );
};

export default CSVManager;
