import React, { useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const StockChart = () => {
  const [symbol, setSymbol] = useState('');
  const [chartData, setChartData] = useState(null);

  const fetchChart = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/stocks/${symbol}/chart`);
      const { dates, prices } = res.data;
      setChartData({
        labels: dates,
        datasets: [
          {
            label: `${symbol} Stock Price`,
            data: prices,
            fill: false,
            borderColor: 'blue',
            tension: 0.1
          }
        ]
      });
    } catch (error) {
      alert("Error fetching chart data");
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Stock Price Chart</h3>
      <input
        type="text"
        placeholder="Enter stock symbol"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
      />
      <button onClick={fetchChart}>Show Chart</button>

      {chartData && (
        <div style={{ width: '600px', marginTop: '20px' }}>
          <Line data={chartData} />
        </div>
      )}
    </div>
  );
};

export default StockChart;
