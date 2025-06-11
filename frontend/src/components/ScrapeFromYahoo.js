import React, { useState } from 'react';
import axios from 'axios';

const ScrapeFromYahoo = () => {
  const [symbol, setSymbol] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [message, setMessage] = useState('');

  // Get base URL from env variable
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const handleScrape = async () => {
    if (!symbol || !start || !end) {
      setMessage("⚠️ Please enter all fields");
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/stocks/${symbol}/scrape-range`, {
        start,
        end
      });

      setMessage(`✅ ${res.data.message}`);
    } catch (err) {
      console.error(err);
      setMessage("❌ Scrape failed. Check the symbol and dates.");
    }
  };

  return (
    <div>
      <h3>Scrape Historical Prices from Yahoo Finance</h3>
      <input
        type="text"
        placeholder="Symbol (e.g. MSFT)"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
      />
      <input
        type="date"
        value={start}
        onChange={(e) => setStart(e.target.value)}
      />
      <input
        type="date"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
      />
      <button onClick={handleScrape}>Scrape</button>

      <p>{message}</p>
    </div>
  );
};

export default ScrapeFromYahoo;
