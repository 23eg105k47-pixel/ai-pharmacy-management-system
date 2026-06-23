import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPatients } from '../../api/patientApi';
import PatientCard from '../../components/PatientCard';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPatients();
        setPatients(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filtered = patients.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.condition.toLowerCase().includes(search.toLowerCase())
  );

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
          <h4>Patient Management</h4>
          <p>View and manage patient records</p>
        </div>
        <Link to="/patients/add" className="btn-primary-custom">
          <i className="bi bi-person-plus"></i> Add Patient
        </Link>
      </div>

      <div className="content-card mb-4">
        <div className="content-card-body">
          <div className="row align-items-center">
            <div className="col-md-8">
              <div className="navbar-search w-100" style={{ maxWidth: '100%' }}>
                <i className="bi bi-search"></i>
                <input type="text" placeholder="Search patients by name or condition..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ width: '100%' }} />
              </div>
            </div>
            <div className="col-md-4 text-md-end mt-2 mt-md-0">
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{filtered.length} patients found</span>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3">
        {filtered.map((patient) => (
          <div className="col-xl-3 col-lg-4 col-md-6" key={patient.id}>
            <PatientCard patient={patient} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientList;
