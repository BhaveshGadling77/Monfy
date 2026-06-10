import { Trash2, Pencil, Receipt } from 'lucide-react';
import { format } from 'date-fns';
import { getCategoryData } from './ExpenseForm';

const ExpenseList = ({ expenses, onDelete, onEdit }) => {
  if (expenses.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">
          <Receipt size={24} color="var(--text-muted)" />
        </div>
        <p>No transactions yet</p>
        <p style={{ fontSize: '0.8rem' }}>Add your first expense to get started</p>
      </div>
    );
  }

  return (
    <div className="transaction-list">
      {expenses.map((expense) => {
        const cat = getCategoryData(expense.category);
        return (
          <div key={expense._id} className="transaction-item">
            <div className="t-left">
              <div className="t-category-icon" style={{ background: cat.color }}>
                {cat.emoji}
              </div>
              <div className="t-info">
                <h4>{expense.title}</h4>
                <p>{expense.category} · {format(new Date(expense.date), 'MMM dd, yyyy')}</p>
              </div>
            </div>
            <div className="t-right">
              <span className="t-amount">-${expense.amount.toFixed(2)}</span>
              <div className="t-actions">
                <button
                  onClick={() => onEdit(expense)}
                  className="btn-icon edit"
                  title="Edit"
                >
                  <Pencil size={15} />
                </button>
                <button
                  onClick={() => onDelete(expense._id)}
                  className="btn-icon delete"
                  title="Delete"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ExpenseList;
