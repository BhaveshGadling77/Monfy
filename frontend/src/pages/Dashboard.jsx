import { useState, useEffect } from 'react';
import api from '../utils/api';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import Chart from '../components/Chart';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingExpense, setEditingExpense] = useState(null);

  const fetchExpenses = async () => {
    try {
      const res = await api.get('/expenses');
      setExpenses(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleAddExpense = async (expenseData) => {
    try {
      const res = await api.post('/expenses', expenseData);
      setExpenses([res.data, ...expenses]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditExpense = async (id, updatedData) => {
    try {
      const res = await api.put(`/expenses/${id}`, updatedData);
      setExpenses(expenses.map(exp => exp._id === id ? res.data : exp));
      setEditingExpense(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await api.delete(`/expenses/${id}`);
      setExpenses(expenses.filter(exp => exp._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const mockIncome = 5000;
  const balance = mockIncome - totalExpenses;

  if (loading) return <div className="container">Loading...</div>;

  return (
    <div className="container animate-fade-in">
      <div className="stats-grid">
        <div className="stat-card glass-panel">
          <span className="stat-title">Total Income</span>
          <span className="stat-value income">${mockIncome.toFixed(2)}</span>
        </div>
        <div className="stat-card glass-panel">
          <span className="stat-title">Total Expenses</span>
          <span className="stat-value expense">${totalExpenses.toFixed(2)}</span>
        </div>
        <div className="stat-card glass-panel">
          <span className="stat-title">Balance</span>
          <span className="stat-value balance">${balance.toFixed(2)}</span>
        </div>
      </div>

      <div className="dashboard-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Financial Reports</h3>
            <Chart expenses={expenses} />
          </div>
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Recent Transactions</h3>
            <ExpenseList 
              expenses={expenses} 
              onDelete={handleDeleteExpense} 
              onEdit={setEditingExpense} 
            />
          </div>
        </div>
        <div>
          <div className="glass-panel" style={{ padding: '1.5rem', position: 'sticky', top: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>
              {editingExpense ? 'Edit Transaction' : 'Add New Transaction'}
            </h3>
            <ExpenseForm 
              onAdd={handleAddExpense} 
              onEdit={handleEditExpense}
              editingExpense={editingExpense}
              setEditingExpense={setEditingExpense}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
