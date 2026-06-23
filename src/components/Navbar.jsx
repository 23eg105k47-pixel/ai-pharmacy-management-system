import { useAuth } from '../context/AuthContext';

const Navbar = ({ onToggleSidebar }) => {
  const { user } = useAuth();
  const initials = user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2) || 'AD';

  return (
    <div className="top-navbar d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center gap-3">
        <button className="mobile-toggle" onClick={onToggleSidebar}>
          <i className="bi bi-list fs-5"></i>
        </button>
        <div className="navbar-search d-none d-md-block">
          <i className="bi bi-search"></i>
          <input type="text" placeholder="Search medicines, patients..." />
        </div>
      </div>
      <div className="navbar-actions">
        <button className="nav-icon-btn">
          <i className="bi bi-bell"></i>
          <span className="badge-dot"></span>
        </button>
        <button className="nav-icon-btn d-none d-sm-flex">
          <i className="bi bi-gear"></i>
        </button>
        <div className="nav-avatar">{initials}</div>
      </div>
    </div>
  );
};

export default Navbar;
