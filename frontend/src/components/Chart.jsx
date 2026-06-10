import { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';
import { format, parseISO } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Chart = ({ expenses }) => {
  const [chartType, setChartType] = useState('doughnut');

  // Doughnut Chart Data (by Category)
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const doughnutData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(139, 92, 246, 0.8)',
        ],
        borderColor: 'rgba(30, 41, 59, 1)',
        borderWidth: 2,
      },
    ],
  };

  // Line Chart Data (Spending over time)
  // Group by date
  const dateTotals = expenses.reduce((acc, expense) => {
    const dateStr = new Date(expense.date).toISOString().split('T')[0];
    acc[dateStr] = (acc[dateStr] || 0) + expense.amount;
    return acc;
  }, {});

  // Sort dates
  const sortedDates = Object.keys(dateTotals).sort();
  
  const lineData = {
    labels: sortedDates.map(d => format(parseISO(d), 'MMM dd')),
    datasets: [
      {
        label: 'Daily Spending',
        data: sortedDates.map(d => dateTotals[d]),
        borderColor: 'rgba(99, 102, 241, 1)',
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        tension: 0.3,
        fill: true,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: { color: '#f8fafc', font: { family: "'Outfit', sans-serif" } }
      },
    },
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.1)' } },
      x: { ticks: { color: '#94a3b8' }, grid: { display: false } }
    },
    plugins: {
      legend: { labels: { color: '#f8fafc', font: { family: "'Outfit', sans-serif" } } }
    }
  };

  if (expenses.length === 0) {
    return <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>Add expenses to see reports</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
        <button 
          onClick={() => setChartType('doughnut')}
          className="btn"
          style={{ padding: '0.5rem 1rem', background: chartType === 'doughnut' ? 'var(--primary)' : 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: '4px' }}
        >
          Categories
        </button>
        <button 
          onClick={() => setChartType('line')}
          className="btn"
          style={{ padding: '0.5rem 1rem', background: chartType === 'line' ? 'var(--primary)' : 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: '4px' }}
        >
          Over Time
        </button>
      </div>
      <div style={{ height: '300px', width: '100%' }}>
        {chartType === 'doughnut' ? (
          <Doughnut data={doughnutData} options={options} />
        ) : (
          <Line data={lineData} options={lineOptions} />
        )}
      </div>
    </div>
  );
};

export default Chart;
