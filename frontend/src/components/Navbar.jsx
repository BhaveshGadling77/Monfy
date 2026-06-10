import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LogOut, Wallet } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar glass-panel">
      <div className="nav-brand">
        <Wallet className="w-8 h-8 text-primary" color="var(--primary)" />
        <span>Monfy</span>
      </div>
      <div className="nav-links">
        <span>Hi, {user?.name}</span>
        <button onClick={logout} className="btn btn-danger" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
