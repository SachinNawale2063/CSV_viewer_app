import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js';
import './SummaryStats.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const SummaryStats = ({ summary }) => {
  const numericCols = Object.keys(summary);

  const chartData = {
    labels: numericCols,
    datasets: [
      {
        label: 'Mean',
        data: numericCols.map(col => summary[col]['mean']),
        backgroundColor: 'rgba(75, 192, 192, 0.6)'
      }
    ]
  };

  return (
    <div className="summary-container">
      <h3>Summary Statistics</h3>
      <table>
        <thead>
          <tr>
            <th>Column</th>
            <th>Min</th>
            <th>Mean</th>
            <th>Max</th>
          </tr>
        </thead>
        <tbody>
          {numericCols.map(col => (
            <tr key={col}>
              <td>{col}</td>
              <td>{summary[col]['min']}</td>
              <td>{summary[col]['mean']}</td>
              <td>{summary[col]['max']}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="chart-wrapper">
        <h4>Mean Values</h4>
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default SummaryStats;
