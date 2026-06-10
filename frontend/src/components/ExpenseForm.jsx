import { useState, useEffect } from 'react';
import { PenLine } from 'lucide-react';

const CATEGORIES = [
  { name: 'Food', emoji: '🍕', color: 'rgba(245, 158, 11, 0.12)' },
  { name: 'Transport', emoji: '🚗', color: 'rgba(59, 130, 246, 0.12)' },
  { name: 'Entertainment', emoji: '🎬', color: 'rgba(236, 72, 153, 0.12)' },
  { name: 'Shopping', emoji: '🛍️', color: 'rgba(139, 92, 246, 0.12)' },
  { name: 'Utilities', emoji: '💡', color: 'rgba(16, 185, 129, 0.12)' },
  { name: 'Health', emoji: '🏥', color: 'rgba(239, 68, 68, 0.12)' },
  { name: 'Education', emoji: '📚', color: 'rgba(99, 102, 241, 0.12)' },
  { name: 'Other', emoji: '📦', color: 'rgba(100, 116, 139, 0.12)' },
];

export const getCategoryData = (categoryName) => {
  return CATEGORIES.find(c => c.name === categoryName) || CATEGORIES[CATEGORIES.length - 1];
};

const ExpenseForm = ({ onAdd, onEdit, editingExpense, setEditingExpense }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0].name);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    if (editingExpense) {
      setTitle(editingExpense.title);
      setAmount(editingExpense.amount);
      setCategory(editingExpense.category);
      setDate(new Date(editingExpense.date).toISOString().split('T')[0]);
    } else {
      setTitle('');
      setAmount('');
      setCategory(CATEGORIES[0].name);
      setDate(new Date().toISOString().split('T')[0]);
    }
  }, [editingExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount) return;

    if (editingExpense) {
      onEdit(editingExpense._id, { title, amount: Number(amount), category, date });
    } else {
      onAdd({ title, amount: Number(amount), category, date });
    }

    setTitle('');
    setAmount('');
    if (setEditingExpense) setEditingExpense(null);
  };

  const cancelEdit = () => {
    if (setEditingExpense) setEditingExpense(null);
    setTitle('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="E.g., Groceries"
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label">Amount ($)</label>
        <input
          type="number"
          className="form-input"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          step="0.01"
          min="0.01"
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label">Category</label>
        <select
          className="form-input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {CATEGORIES.map(c => (
            <option key={c.name} value={c.name} style={{ background: '#1e293b', color: '#f1f5f9' }}>
              {c.emoji}  {c.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Date</label>
        <input
          type="date"
          className="form-input"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem', padding: '0.85rem' }}>
        <PenLine size={16} />
        {editingExpense ? 'Update Expense' : 'Add Expense'}
      </button>
      {editingExpense && (
        <button type="button" onClick={cancelEdit} className="btn btn-secondary" style={{ width: '100%', marginTop: '0.5rem', padding: '0.75rem' }}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default ExpenseForm;
