import { Trash2 } from 'lucide-react';
import { format } from 'date-fns';

const ExpenseList = ({ expenses, onDelete }) => {
  if (expenses.length === 0) {
    return <p style={{ color: 'var(--text-muted)' }}>No transactions yet.</p>;
  }

  return (
    <div className="transaction-list">
      {expenses.map((expense) => (
        <div key={expense._id} className="transaction-item">
          <div className="t-info">
            <h4>{expense.title}</h4>
            <p>{expense.category} • {format(new Date(expense.date), 'MMM dd, yyyy')}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span className="t-amount">${expense.amount.toFixed(2)}</span>
            <button 
              onClick={() => onDelete(expense._id)} 
              style={{ color: 'var(--text-muted)' }}
              title="Delete"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
