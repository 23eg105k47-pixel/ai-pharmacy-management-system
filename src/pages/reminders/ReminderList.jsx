import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getReminders } from '../../api/reminderApi';
import ReminderCard from '../../components/ReminderCard';

const ReminderList = () => {
  const [reminders, setReminders] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getReminders();
        setReminders(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filtered = filter === 'all' ? reminders : reminders.filter(r => r.status === filter);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="spinner-border" style={{ color: 'var(--primary)' }} role="status"></div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="page-header d-flex justify-content-between align-items-start flex-wrap gap-2">
        <div>
          <h4>Medicine Reminders</h4>
          <p>Manage patient medicine reminders and schedules</p>
        </div>
        <Link to="/reminders/add" className="btn-primary-custom">
          <i className="bi bi-plus-lg"></i> Add Reminder
        </Link>
      </div>

      <div className="d-flex gap-2 mb-4 flex-wrap">
        {['all', 'Active', 'Completed'].map((f) => (
          <button key={f} className={`btn-outline-custom ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)} style={{ padding: '6px 16px', fontSize: '0.8rem', background: filter === f ? 'var(--primary)' : undefined, color: filter === f ? 'white' : undefined, borderColor: filter === f ? 'var(--primary)' : undefined }}>
            {f === 'all' ? 'All' : f} ({f === 'all' ? reminders.length : reminders.filter(r => r.status === f).length})
          </button>
        ))}
      </div>

      <div className="row g-3">
        {filtered.map((reminder) => (
          <div className="col-xl-4 col-md-6" key={reminder.id}>
            <ReminderCard reminder={reminder} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReminderList;
