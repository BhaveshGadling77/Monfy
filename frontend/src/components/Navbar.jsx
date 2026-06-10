import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LogOut, Wallet } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const initials = user?.name
    ? user.name.split(' ').map(w => w[0]).join('').slice(0, 2)
    : '?';

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <div className="nav-brand-icon">
          <Wallet size={20} color="#fff" />
        </div>
        <span>Monfy</span>
      </div>
      <div className="nav-right">
        <div className="nav-user">
          <div className="nav-avatar">{initials}</div>
          <span className="nav-user-name">{user?.name}</span>
        </div>
        <button
          onClick={logout}
          className="btn btn-danger"
          style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
