import { useState, useEffect } from 'react';


const CATEGORIES = ['Food', 'Transport', 'Entertainment', 'Shopping', 'Utilities', 'Other'];

const ExpenseForm = ({ onAdd, onEdit, editingExpense, setEditingExpense }) => {
  const [title, setTitle] = useState(editingExpense ? editingExpense.title : '');
  const [amount, setAmount] = useState(editingExpense ? editingExpense.amount : '');
  const [category, setCategory] = useState(editingExpense ? editingExpense.category : CATEGORIES[0]);
  const [date, setDate] = useState(editingExpense ? new Date(editingExpense.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]);

  // Update local state when editingExpense prop changes
  useEffect(() => {
    if (editingExpense) {
      setTitle(editingExpense.title);
      setAmount(editingExpense.amount);
      setCategory(editingExpense.category);
      setDate(new Date(editingExpense.date).toISOString().split('T')[0]);
    } else {
      setTitle('');
      setAmount('');
      setCategory(CATEGORIES[0]);
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
            <option key={c} value={c} style={{ color: '#000' }}>{c}</option>
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
      <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
        {editingExpense ? 'Update Expense' : 'Add Expense'}
      </button>
      {editingExpense && (
        <button type="button" onClick={cancelEdit} className="btn" style={{ width: '100%', marginTop: '0.5rem', border: '1px solid var(--border-color)' }}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default ExpenseForm;
