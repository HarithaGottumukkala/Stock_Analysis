import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PortfolioReport = () => {
  const [report, setReport] = useState(null);

  // Use environment variable for backend base URL
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    axios.get(`${API_BASE_URL}/report/summary`)
      .then(res => setReport(res.data))
      .catch(err => {
        console.error("Failed to fetch portfolio report:", err);
      });
  }, [API_BASE_URL]);

  return (
    <div className="report">
      <h3>📋 Portfolio Report</h3>
      {report ? (
        <>
          <p><strong>Total Stocks:</strong> {report.total_stocks}</p>
          <p><strong>Total Shares:</strong> {report.total_shares}</p>
          <p><strong>Latest Price Date:</strong> {report.latest_price_date}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PortfolioReport;
