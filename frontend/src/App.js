import React from 'react';
import './App.css';

import AddStock from './components/AddStock';
import StockList from './components/StockList';
import BuySellStock from './components/BuySellStock';
import ScrapeFromYahoo from './components/ScrapeFromYahoo';
import PriceHistoryTable from './components/PriceHistoryTable';
import StockChart from './components/StockChart';
import CSVManager from './components/CSVManager';
import PortfolioReport from './components/PortfolioReport';


function App() {
  return (
    <div className="dashboard">
      <h1 className="title">📈 Stock Analyzer Dashboard</h1>

      <div className="grid-container">
        <div className="card fade-in"><AddStock /></div>
        <div className="card fade-in"><StockList /></div>
        <div className="card fade-in"><BuySellStock /></div>
        <div className="card fade-in"><ScrapeFromYahoo /></div>
        <div className="card fade-in"><StockChart /></div>
        <div className="card fade-in"><PriceHistoryTable /></div>
        <div className="card fade-in"><CSVManager /></div>
        <div className="card fade-in"><PortfolioReport/></div>
      </div>
    </div>
  );
}

export default App;
