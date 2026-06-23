import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isOpen, onClose }) => {
  const { logout } = useAuth();

  const menuItems = [
    { section: 'Main', items: [
      { path: '/dashboard', icon: 'bi-grid-1x2-fill', label: 'Dashboard' },
      { path: '/medicines', icon: 'bi-capsule', label: 'Medicines' },
      { path: '/patients', icon: 'bi-people-fill', label: 'Patients' },
    ]},
    { section: 'Management', items: [
      { path: '/reminders', icon: 'bi-bell-fill', label: 'Reminders' },
      { path: '/health-records', icon: 'bi-heart-pulse-fill', label: 'Health Records' },
      { path: '/billing', icon: 'bi-receipt', label: 'Billing' },
    ]},
    { section: 'AI & Admin', items: [
      { path: '/medicine-recognition', icon: 'bi-robot', label: 'AI Recognition' },
      { path: '/admin/users', icon: 'bi-shield-lock-fill', label: 'User Management' },
      { path: '/admin/reports', icon: 'bi-bar-chart-line-fill', label: 'Reports' },
    ]},
  ];

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'show' : ''}`} onClick={onClose}></div>
      <aside className={`sidebar ${isOpen ? 'show' : ''}`}>
        <div className="sidebar-brand">
          <div className="sidebar-brand-icon">
            <i className="bi bi-capsule"></i>
          </div>
          <div className="sidebar-brand-text">
            <h5>PharmAI</h5>
            <small>Management System</small>
          </div>
        </div>
        <nav className="sidebar-nav">
          {menuItems.map((section, idx) => (
            <div className="sidebar-section" key={idx}>
              <div className="sidebar-section-title">{section.section}</div>
              {section.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                  onClick={onClose}
                >
                  <i className={`bi ${item.icon}`}></i>
                  {item.label}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
        <div className="p-3 mt-auto border-top" style={{ borderColor: 'var(--border-color)' }}>
          <button className="sidebar-link w-100 border-0 text-start" onClick={logout} style={{ background: 'none', cursor: 'pointer' }}>
            <i className="bi bi-box-arrow-left"></i>
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
