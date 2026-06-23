import { Link } from 'react-router-dom';

const PatientCard = ({ patient }) => (
  <div className="content-card h-100">
    <div className="content-card-body">
      <div className="d-flex align-items-center gap-3 mb-3">
        <div className="nav-avatar" style={{ width: 44, height: 44, fontSize: '0.9rem', background: 'var(--gradient-2)' }}>
          {patient.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
        </div>
        <div>
          <h6 className="mb-0" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{patient.name}</h6>
          <small style={{ color: 'var(--text-muted)' }}>{patient.age} yrs • {patient.gender}</small>
        </div>
      </div>
      <div className="mt-2 pt-3" style={{ borderTop: '1px solid var(--border-color)' }}>
        <div className="d-flex justify-content-between mb-2">
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Blood Group</span>
          <span className="badge-custom badge-danger">{patient.bloodGroup}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Condition</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)' }}>{patient.condition}</span>
        </div>
        <div className="d-flex justify-content-between">
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Last Visit</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--primary-light)' }}>{patient.lastVisit}</span>
        </div>
      </div>
      <Link to={`/patients/${patient.id}`} className="btn-primary-custom w-100 justify-content-center mt-3" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
        View Details
      </Link>
    </div>
  </div>
);

export default PatientCard;
