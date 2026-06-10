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
  ArcElement,
  Filler
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { format, parseISO, startOfWeek, endOfWeek, eachWeekOfInterval, subWeeks } from 'date-fns';
import { PieChart, BarChart3, TrendingUp } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

const CHART_COLORS = [
  '#818cf8', // indigo
  '#f472b6', // pink
  '#34d399', // emerald
  '#fbbf24', // amber
  '#60a5fa', // blue
  '#a78bfa', // violet
  '#fb923c', // orange
  '#94a3b8', // slate
];

const ChartComponent = ({ expenses }) => {
  const [chartType, setChartType] = useState('doughnut');

  // ── Category breakdown ──
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const sortedCategories = Object.entries(categoryTotals)
    .sort(([, a], [, b]) => b - a);

  const doughnutData = {
    labels: sortedCategories.map(([k]) => k),
    datasets: [{
      data: sortedCategories.map(([, v]) => v),
      backgroundColor: CHART_COLORS.slice(0, sortedCategories.length),
      borderColor: 'rgba(10, 14, 26, 0.8)',
      borderWidth: 3,
      hoverOffset: 6,
    }],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '72%',
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#cbd5e1',
          font: { family: "'Inter', sans-serif", size: 12 },
          padding: 14,
          usePointStyle: true,
          pointStyleWidth: 8,
        }
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        titleFont: { family: "'Inter', sans-serif", weight: '600' },
        bodyFont: { family: "'Inter', sans-serif" },
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: (ctx) => ` $${ctx.parsed.toFixed(2)}`
        }
      }
    },
  };

  // ── Weekly spending breakdown ──
  const dateTotals = expenses.reduce((acc, expense) => {
    const dateStr = new Date(expense.date).toISOString().split('T')[0];
    acc[dateStr] = (acc[dateStr] || 0) + expense.amount;
    return acc;
  }, {});

  const sortedDates = Object.keys(dateTotals).sort();

  // Group into weeks
  let weekLabels = [];
  let weekData = [];

  if (sortedDates.length > 0) {
    const startDate = parseISO(sortedDates[0]);
    const endDate = parseISO(sortedDates[sortedDates.length - 1]);
    const weeks = eachWeekOfInterval({ start: startDate, end: endDate }, { weekStartsOn: 1 });

    weeks.forEach(weekStart => {
      const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });
      const weekTotal = sortedDates.reduce((sum, dateStr) => {
        const d = parseISO(dateStr);
        if (d >= weekStart && d <= weekEnd) {
          return sum + dateTotals[dateStr];
        }
        return sum;
      }, 0);
      weekLabels.push(format(weekStart, 'MMM dd'));
      weekData.push(weekTotal);
    });
  }

  const barData = {
    labels: weekLabels,
    datasets: [{
      label: 'Weekly Spending',
      data: weekData,
      backgroundColor: weekData.map((_, i) =>
        `rgba(99, 102, 241, ${0.4 + (i / weekData.length) * 0.5})`
      ),
      borderColor: 'rgba(99, 102, 241, 0.8)',
      borderWidth: 1,
      borderRadius: 6,
      borderSkipped: false,
    }],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: '#64748b', font: { size: 11 }, callback: (v) => `$${v}` },
        grid: { color: 'rgba(255,255,255,0.04)', drawBorder: false },
        border: { display: false }
      },
      x: {
        ticks: { color: '#64748b', font: { size: 11 } },
        grid: { display: false },
        border: { display: false }
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        titleFont: { family: "'Inter', sans-serif", weight: '600' },
        bodyFont: { family: "'Inter', sans-serif" },
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: (ctx) => ` $${ctx.parsed.y.toFixed(2)}`
        }
      }
    },
  };

  if (expenses.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">
          <PieChart size={24} color="var(--text-muted)" />
        </div>
        <p>No data to display</p>
        <p style={{ fontSize: '0.8rem' }}>Add expenses to see your reports</p>
      </div>
    );
  }

  const totalSpent = Object.values(categoryTotals).reduce((a, b) => a + b, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="chart-toggle">
          <button
            onClick={() => setChartType('doughnut')}
            className={`chart-toggle-btn ${chartType === 'doughnut' ? 'active' : ''}`}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <PieChart size={14} /> Categories
            </span>
          </button>
          <button
            onClick={() => setChartType('bar')}
            className={`chart-toggle-btn ${chartType === 'bar' ? 'active' : ''}`}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <BarChart3 size={14} /> Weekly
            </span>
          </button>
        </div>
      </div>

      <div style={{ height: '280px', width: '100%' }}>
        {chartType === 'doughnut' ? (
          <div style={{ position: 'relative', height: '100%' }}>
            <Doughnut data={doughnutData} options={doughnutOptions} />
            <div style={{
              position: 'absolute', top: '50%', left: 'calc(50% - 60px)',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center', pointerEvents: 'none'
            }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total</div>
              <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-main)' }}>${totalSpent.toFixed(0)}</div>
            </div>
          </div>
        ) : (
          <Bar data={barData} options={barOptions} />
        )}
      </div>
    </div>
  );
};

export default ChartComponent;
