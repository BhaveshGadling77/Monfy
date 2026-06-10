import { useState } from 'react';

const CATEGORIES = ['Food', 'Transport', 'Entertainment', 'Shopping', 'Utilities', 'Other'];

const ExpenseForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount) return;
    onAdd({ title, amount: Number(amount), category, date });
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
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;
