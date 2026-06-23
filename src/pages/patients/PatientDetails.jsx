import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPatientById } from '../../api/patientApi';

const PatientDetails = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPatientById(id);
        setPatient(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading || !patient) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="spinner-border" style={{ color: 'var(--primary)' }} role="status"></div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="page-header">
        <div className="d-flex align-items-center gap-2 mb-1">
          <Link to="/patients" style={{ color: 'var(--text-muted)' }}><i className="bi bi-arrow-left"></i></Link>
          <h4 className="mb-0">Patient Details</h4>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-4">
          <div className="content-card">
            <div className="content-card-body text-center">
              <div className="nav-avatar mx-auto mb-3" style={{ width: 72, height: 72, fontSize: '1.5rem', background: 'var(--gradient-2)' }}>
                {patient.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <h5 style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{patient.name}</h5>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{patient.age} years • {patient.gender}</p>
              <div className="d-flex justify-content-center gap-2 mb-3">
                <span className="badge-custom badge-danger">{patient.bloodGroup}</span>
                <span className="badge-custom badge-primary">{patient.condition}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="content-card">
            <div className="content-card-header">
              <h6><i className="bi bi-person-lines-fill me-2"></i>Personal Information</h6>
            </div>
            <div className="content-card-body">
              <div className="row g-4">
                {[
                  ['Phone', patient.phone, 'bi-telephone'],
                  ['Email', patient.email, 'bi-envelope'],
                  ['Address', patient.address, 'bi-geo-alt'],
                  ['Blood Group', patient.bloodGroup, 'bi-droplet'],
                  ['Condition', patient.condition, 'bi-heart-pulse'],
                  ['Doctor', patient.doctor, 'bi-person-badge'],
                  ['Last Visit', patient.lastVisit, 'bi-calendar'],
                  ['Allergies', patient.allergies || 'None', 'bi-exclamation-triangle'],
                ].map(([label, value, icon]) => (
                  <div className="col-md-6" key={label}>
                    <div className="d-flex align-items-start gap-3">
                      <div className="stat-card-icon blue" style={{ width: 36, height: 36, fontSize: '0.9rem', flexShrink: 0 }}>
                        <i className={`bi ${icon}`}></i>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 500 }}>{value}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
