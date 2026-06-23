const ReminderCard = ({ reminder }) => {
  const statusClass = reminder.status === 'Active' ? 'badge-success' : 'badge-info';
  
  return (
    <div className="content-card h-100">
      <div className="content-card-body">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div className="stat-card-icon green" style={{ width: 40, height: 40, fontSize: '1rem' }}>
            <i className="bi bi-bell-fill"></i>
          </div>
          <span className={`badge-custom ${statusClass}`}>{reminder.status}</span>
        </div>
        <h6 className="mb-1" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{reminder.medicineName}</h6>
        <small style={{ color: 'var(--text-muted)' }}>Patient: {reminder.patientName}</small>
        <div className="mt-3 pt-3" style={{ borderTop: '1px solid var(--border-color)' }}>
          <div className="d-flex justify-content-between mb-2">
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Dosage</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)' }}>{reminder.dosage}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Frequency</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)' }}>{reminder.frequency}</span>
          </div>
          <div className="d-flex justify-content-between">
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Time</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--primary-light)' }}>{reminder.time}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReminderCard;
