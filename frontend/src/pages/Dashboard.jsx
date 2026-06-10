import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import Chart from '../components/Chart';
import SettingsPanel from '../components/SettingsPanel';
import { TrendingUp, TrendingDown, Wallet, BarChart3, Receipt, Plus } from 'lucide-react';

const Dashboard = () => {
  const { user, updateSettings } = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingExpense, setEditingExpense] = useState(null);

  const fetchExpenses = async () => {
    try {
      // console.log(import.meta.env);
      const res = await api.get('/expenses');
      if (Array.isArray(res.data)) {
        setExpenses(res.data);
      } else {
        console.error('Expected array from API but got:', res.data);
        setExpenses([]);
      }
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
  const userIncome = user?.income || 0;
  const startingBalance = user?.balance || 0;
  const balance = startingBalance + userIncome - totalExpenses;

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="container animate-fade-in">
      <div className="page-header">
        <h1>{greeting()}, {user?.name?.split(' ')[0]} 👋</h1>
        <p>Here's what's happening with your finances</p>
      </div>

      <div className="stats-grid stagger-children">
        <div className="stat-card glass-panel income-card">
          <div className="stat-icon income">
            <TrendingUp size={22} />
          </div>
          <div className="stat-content">
            <span className="stat-title">Income</span>
            <span className="stat-value income">${userIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
          </div>
        </div>
        <div className="stat-card glass-panel expense-card">
          <div className="stat-icon expense">
            <TrendingDown size={22} />
          </div>
          <div className="stat-content">
            <span className="stat-title">Expenses</span>
            <span className="stat-value expense">${totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
          </div>
        </div>
        <div className="stat-card glass-panel balance-card">
          <div className="stat-icon balance">
            <Wallet size={22} />
          </div>
          <div className="stat-content">
            <span className="stat-title">Balance</span>
            <span className="stat-value balance">${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="glass-panel panel">
            <div className="section-header">
              <div className="section-icon" style={{ background: 'rgba(99, 102, 241, 0.12)', color: 'var(--primary-light)' }}>
                <BarChart3 size={18} />
              </div>
              <h3>Financial Reports</h3>
            </div>
            <Chart expenses={expenses} />
          </div>

          <div className="glass-panel panel">
            <div className="section-header">
              <div className="section-icon" style={{ background: 'rgba(236, 72, 153, 0.12)', color: 'var(--secondary-light)' }}>
                <Receipt size={18} />
              </div>
              <h3>Recent Transactions</h3>
              {expenses.length > 0 && (
                <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.04)', padding: '0.25rem 0.75rem', borderRadius: '20px' }}>
                  {expenses.length} total
                </span>
              )}
            </div>
            <ExpenseList
              expenses={expenses}
              onDelete={handleDeleteExpense}
              onEdit={setEditingExpense}
            />
          </div>
        </div>

        <div>
          <SettingsPanel />
          <div className="glass-panel panel" style={{ position: 'sticky', top: '5rem' }}>
            <div className="section-header">
              <div className="section-icon" style={{ background: 'rgba(16, 185, 129, 0.12)', color: 'var(--success-light)' }}>
                <Plus size={18} />
              </div>
              <h3>{editingExpense ? 'Edit Transaction' : 'New Transaction'}</h3>
            </div>
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
