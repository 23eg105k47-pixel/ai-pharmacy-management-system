import { useState } from 'react';

const mockUsers = [
  { id: 1, name: 'Dr. Saketh Kumar', email: 'saketh@pharmacy.com', role: 'Admin', status: 'Active', lastLogin: '2026-06-22 14:30' },
  { id: 2, name: 'Priya Singh', email: 'priya@pharmacy.com', role: 'Doctor', status: 'Active', lastLogin: '2026-06-22 10:15' },
  { id: 3, name: 'Vikram Rao', email: 'vikram@pharmacy.com', role: 'Doctor', status: 'Active', lastLogin: '2026-06-21 18:45' },
  { id: 4, name: 'Neha Gupta', email: 'neha@pharmacy.com', role: 'Pharmacist', status: 'Active', lastLogin: '2026-06-22 09:00' },
  { id: 5, name: 'Ravi Teja', email: 'ravi@pharmacy.com', role: 'Pharmacist', status: 'Inactive', lastLogin: '2026-06-15 11:20' },
];

const Users = () => {
  const [users] = useState(mockUsers);
  const [search, setSearch] = useState('');

  const filtered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="fade-in">
      <div className="page-header">
        <h4><i className="bi bi-shield-lock me-2" style={{ color: 'var(--primary-light)' }}></i>User Management</h4>
        <p>Manage system users and access controls</p>
      </div>

      <div className="row g-3 mb-4">
        {[
          { label: 'Total Users', value: users.length, icon: 'bi-people', color: 'purple' },
          { label: 'Active Users', value: users.filter(u => u.status === 'Active').length, icon: 'bi-person-check', color: 'green' },
          { label: 'Inactive Users', value: users.filter(u => u.status === 'Inactive').length, icon: 'bi-person-x', color: 'pink' },
        ].map((stat, i) => (
          <div className="col-md-4" key={i}>
            <div className={`stat-card ${stat.color}`}>
              <div className={`stat-card-icon ${stat.color}`}><i className={`bi ${stat.icon}`}></i></div>
              <div className="stat-card-value">{stat.value}</div>
              <div className="stat-card-label">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="content-card">
        <div className="content-card-header">
          <h6>All Users</h6>
          <div className="navbar-search" style={{ maxWidth: 300 }}>
            <i className="bi bi-search"></i>
            <input type="text" placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>
        <div className="content-card-body p-0">
          <div className="table-responsive">
            <table className="table-dark-custom">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Last Login</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <div className="nav-avatar" style={{ width: 32, height: 32, fontSize: '0.7rem' }}>
                          {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{user.name}</div>
                          <small style={{ color: 'var(--text-muted)' }}>{user.email}</small>
                        </div>
                      </div>
                    </td>
                    <td><span className="badge-custom badge-primary">{user.role}</span></td>
                    <td><span className={`badge-custom ${user.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>{user.status}</span></td>
                    <td style={{ color: 'var(--text-muted)' }}>{user.lastLogin}</td>
                    <td>
                      <div className="d-flex gap-1">
                        <button className="btn-outline-custom" style={{ padding: '4px 10px', fontSize: '0.75rem' }}><i className="bi bi-pencil"></i></button>
                        <button className="btn-danger-custom" style={{ padding: '4px 10px', fontSize: '0.75rem' }}><i className="bi bi-trash"></i></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
