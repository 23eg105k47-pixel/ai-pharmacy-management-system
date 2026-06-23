import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMedicines } from '../../api/medicineApi';
import { getPatients } from '../../api/patientApi';
import { getReminders } from '../../api/reminderApi';

const Dashboard = () => {
  const [stats, setStats] = useState({ medicines: 0, patients: 0, lowStock: 0, activeReminders: 0 });
  const [recentMedicines, setRecentMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [medRes, patRes, remRes] = await Promise.all([
          getMedicines(), getPatients(), getReminders()
        ]);
        const meds = medRes.data;
        setStats({
          medicines: meds.length,
          patients: patRes.data.length,
          lowStock: meds.filter(m => m.stock <= 12 && m.stock > 0).length,
          activeReminders: remRes.data.filter(r => r.status === 'Active').length
        });
        setRecentMedicines(meds.slice(0, 5));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const activities = [
    { icon: 'bi-capsule', color: 'var(--gradient-1)', text: 'New medicine "Azithromycin 500mg" added', time: '2 min ago' },
    { icon: 'bi-person-plus', color: 'var(--gradient-2)', text: 'Patient Kavitha Reddy registered', time: '15 min ago' },
    { icon: 'bi-bell', color: 'var(--gradient-4)', text: 'Reminder sent to Rajesh Sharma', time: '1 hour ago' },
    { icon: 'bi-receipt', color: 'var(--gradient-5)', text: 'Invoice #INV-1024 generated ₹2,450', time: '2 hours ago' },
    { icon: 'bi-exclamation-triangle', color: 'var(--gradient-3)', text: 'Low stock alert: Amoxicillin 250mg', time: '3 hours ago' },
  ];

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="text-center">
          <div className="spinner-border" style={{ color: 'var(--primary)', width: '3rem', height: '3rem' }} role="status"></div>
          <p className="mt-3" style={{ color: 'var(--text-muted)' }}>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
        <div>
          <h4>Dashboard</h4>
          <p>Welcome back! Here's an overview of your pharmacy.</p>
        </div>
        <Link to="/medicines/add" className="btn-primary-custom">
          <i className="bi bi-plus-lg"></i> Add Medicine
        </Link>
      </div>

      {/* Stats */}
      <div className="row g-3 mb-4">
        {[
          { label: 'Total Medicines', value: stats.medicines, icon: 'bi-capsule', color: 'purple', change: '+12%' },
          { label: 'Total Patients', value: stats.patients, icon: 'bi-people-fill', color: 'blue', change: '+8%' },
          { label: 'Low Stock Items', value: stats.lowStock, icon: 'bi-exclamation-triangle-fill', color: 'pink', change: '-3%', negative: true },
          { label: 'Active Reminders', value: stats.activeReminders, icon: 'bi-bell-fill', color: 'green', change: '+5%' },
          { label: 'Monthly Revenue', value: '₹1,24,500', icon: 'bi-currency-rupee', color: 'yellow', change: '+18%' },
        ].map((stat, i) => (
          <div className="col-xl col-md-4 col-sm-6" key={i}>
            <div className={`stat-card ${stat.color}`}>
              <div className={`stat-card-icon ${stat.color}`}>
                <i className={`bi ${stat.icon}`}></i>
              </div>
              <div className="stat-card-value">{stat.value}</div>
              <div className="stat-card-label">{stat.label}</div>
              <div className={`stat-card-change ${stat.negative ? 'negative' : 'positive'}`}>
                <i className={`bi ${stat.negative ? 'bi-arrow-down' : 'bi-arrow-up'}`}></i> {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-3">
        {/* Recent Medicines */}
        <div className="col-lg-8">
          <div className="content-card">
            <div className="content-card-header">
              <h6><i className="bi bi-capsule me-2"></i>Recent Medicine Inventory</h6>
              <Link to="/medicines" className="btn-outline-custom" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>View All</Link>
            </div>
            <div className="content-card-body p-0">
              <div className="table-responsive">
                <table className="table-dark-custom">
                  <thead>
                    <tr>
                      <th>Medicine</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentMedicines.map((med) => (
                      <tr key={med.id}>
                        <td>
                          <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{med.name}</div>
                          <small style={{ color: 'var(--text-muted)' }}>{med.manufacturer}</small>
                        </td>
                        <td><span className="badge-custom badge-primary">{med.category}</span></td>
                        <td style={{ fontWeight: 600, color: 'var(--success)' }}>₹{med.price}</td>
                        <td>{med.stock}</td>
                        <td>
                          <span className={`badge-custom badge-${med.status === 'In Stock' ? 'success' : med.status === 'Low Stock' ? 'warning' : 'danger'}`}>
                            {med.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Activity */}
        <div className="col-lg-4">
          <div className="content-card">
            <div className="content-card-header">
              <h6><i className="bi bi-activity me-2"></i>Recent Activity</h6>
            </div>
            <div className="content-card-body">
              {activities.map((act, i) => (
                <div className="activity-item" key={i}>
                  <div className="activity-icon" style={{ background: act.color }}>
                    <i className={`bi ${act.icon} text-white`}></i>
                  </div>
                  <div className="activity-content">
                    <h6>{act.text}</h6>
                    <small>{act.time}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
