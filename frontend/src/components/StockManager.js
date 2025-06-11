import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StockManager.css';

const StockManager = () => {
  const [stocks, setStocks] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState('');
  const [symbol, setSymbol] = useState('');
  const [shares, setShares] = useState('');
  const [buySellAmount, setBuySellAmount] = useState('');

  // Use environment variable for API base URL
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  // Fetch stock list
  const fetchStocks = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/stocks`);
      setStocks(res.data);
    } catch (error) {
      alert("❌ Failed to fetch stock list.");
      console.error(error);
    }
  };

  // Add new stock
  const addStock = async () => {
    if (!symbol) return alert("Enter a stock symbol");
    try {
      await axios.post(`${API_BASE_URL}/stocks`, { symbol });
      fetchStocks();
      setSymbol('');
    } catch (err) {
      alert("❌ Could not add stock.");
      console.error(err);
    }
  };

  // Delete selected stock with confirmation
  const deleteStock = async () => {
    if (!selectedSymbol) return;
    const confirmDelete = window.confirm(`Are you sure you want to delete ${selectedSymbol}?`);
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_BASE_URL}/stocks/${selectedSymbol}`);
      setSelectedSymbol('');
      fetchStocks();
    } catch (err) {
      alert("❌ Could not delete stock.");
      console.error(err);
    }
  };

  // Buy or sell shares
  const updateShares = async (action) => {
    if (!selectedSymbol || !buySellAmount) return;
    try {
      await axios.put(`${API_BASE_URL}/stocks/${selectedSymbol}/shares`, {
        action,
        amount: parseInt(buySellAmount)
      });
      setBuySellAmount('');
      fetchStocks();
    } catch (err) {
      alert(`❌ Failed to ${action} shares.`);
      console.error(err);
    }
  };

  // Scrape today’s price from Yahoo
  const scrapeToday = async () => {
    if (!selectedSymbol) return alert("Select a stock to scrape");

    try {
      const res = await axios.post(`${API_BASE_URL}/stocks/${selectedSymbol}/scrape-today`);
      alert(`✅ Scraped ${res.data.symbol} @ $${res.data.price} on ${res.data.date}`);
    } catch (err) {
      alert("❌ Failed to scrape today's price.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  const selectedStock = stocks.find(s => s.symbol === selectedSymbol);

  return (
    <div className="manager-wrapper">
      <h2>
        {selectedSymbol
          ? `${selectedSymbol} - ${selectedStock?.shares || 0} Shares`
          : 'Select a stock from the list'}
      </h2>

      <div className="stock-list">
        <select size="5" value={selectedSymbol} onChange={e => setSelectedSymbol(e.target.value)}>
          {stocks.map(stock => (
            <option key={stock.symbol} value={stock.symbol}>
              {stock.symbol}
            </option>
          ))}
        </select>
      </div>

      <div className="form-area">
        <div className="row">
          <label>Symbol:</label>
          <input
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            placeholder="e.g. MSFT"
          />
        </div>

        <div className="row">
          <label>Shares (optional):</label>
          <input
            value={shares}
            onChange={(e) => setShares(e.target.value)}
            placeholder="(Optional: not stored)"
          />
        </div>

        <button onClick={addStock}>Add Stock</button>

        <div className="row">
          <label>Shares to Buy/Sell [{selectedSymbol}]</label>
          <input
            value={buySellAmount}
            onChange={(e) => setBuySellAmount(e.target.value)}
            placeholder="Enter number of shares"
          />
        </div>

        <div className="btn-row">
          <button onClick={() => updateShares('buy')}>Buy</button>
          <button onClick={() => updateShares('sell')}>Sell</button>
        </div>

        <button onClick={scrapeToday}>Scrape Today's Price</button>
        <button onClick={deleteStock}>Delete Stock</button>
      </div>
    </div>
  );
};

export default StockManager;
