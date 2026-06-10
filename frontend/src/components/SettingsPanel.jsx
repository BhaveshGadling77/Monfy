import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Settings } from 'lucide-react';

const SettingsPanel = () => {
  const { user, updateSettings } = useContext(AuthContext);
  const [income, setIncome] = useState(user?.income || 0);
  const [balance, setBalance] = useState(user?.balance || 0);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateSettings(Number(income), Number(balance));
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isEditing) {
    return (
      <div className="glass-panel panel" style={{ marginBottom: '1.25rem' }}>
        <div className="section-header" style={{ justifyContent: 'space-between', marginBottom: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="section-icon" style={{ background: 'rgba(139, 92, 246, 0.12)', color: 'var(--accent)' }}>
              <Settings size={18} />
            </div>
            <h3>Wallet Settings</h3>
          </div>
          <button onClick={() => setIsEditing(true)} className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', borderRadius: '4px' }}>
            Edit
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel panel" style={{ marginBottom: '1.25rem' }}>
      <div className="section-header">
        <div className="section-icon" style={{ background: 'rgba(139, 92, 246, 0.12)', color: 'var(--accent)' }}>
          <Settings size={18} />
        </div>
        <h3>Wallet Settings</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Monthly Income ($)</label>
          <input 
            type="number" 
            className="form-input" 
            value={income} 
            onChange={(e) => setIncome(e.target.value)} 
            step="0.01"
            min="0"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Starting Balance ($)</label>
          <input 
            type="number" 
            className="form-input" 
            value={balance} 
            onChange={(e) => setBalance(e.target.value)} 
            step="0.01"
          />
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button type="submit" className="btn btn-primary" style={{ flex: 1, padding: '0.75rem' }} disabled={loading}>
            {loading ? 'Saving...' : 'Save Settings'}
          </button>
          <button type="button" onClick={() => {
            setIncome(user?.income || 0);
            setBalance(user?.balance || 0);
            setIsEditing(false);
          }} className="btn btn-secondary" style={{ padding: '0.75rem' }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingsPanel;
