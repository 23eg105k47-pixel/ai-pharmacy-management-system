import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getHealthRecords } from '../../api/healthApi';

const HealthRecords = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getHealthRecords();
        setRecords(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
          <h4>Health Records</h4>
          <p>Track patient health metrics and vitals</p>
        </div>
        <Link to="/health-records/add" className="btn-primary-custom">
          <i className="bi bi-plus-lg"></i> Add Record
        </Link>
      </div>

      <div className="row g-3 mb-4">
        {[
          { label: 'Total Records', value: records.length, icon: 'bi-file-medical', color: 'purple' },
          { label: 'Avg Heart Rate', value: Math.round(records.reduce((a, r) => a + r.heartRate, 0) / records.length) + ' bpm', icon: 'bi-heart-pulse', color: 'pink' },
          { label: 'Latest Check', value: records[records.length - 1]?.date || 'N/A', icon: 'bi-calendar-check', color: 'green' },
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
          <h6><i className="bi bi-table me-2"></i>Health Records</h6>
        </div>
        <div className="content-card-body p-0">
          <div className="table-responsive">
            <table className="table-dark-custom">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Date</th>
                  <th>BP</th>
                  <th>Heart Rate</th>
                  <th>Temp (°F)</th>
                  <th>Weight (kg)</th>
                  <th>Blood Sugar</th>
                  <th>Doctor</th>
                </tr>
              </thead>
              <tbody>
                {records.map((rec) => (
                  <tr key={rec.id}>
                    <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{rec.patientName}</td>
                    <td>{rec.date}</td>
                    <td><span className="badge-custom badge-info">{rec.bloodPressure}</span></td>
                    <td>{rec.heartRate} bpm</td>
                    <td>{rec.temperature}</td>
                    <td>{rec.weight}</td>
                    <td>
                      <span className={`badge-custom ${rec.bloodSugar > 140 ? 'badge-danger' : rec.bloodSugar > 100 ? 'badge-warning' : 'badge-success'}`}>
                        {rec.bloodSugar} mg/dL
                      </span>
                    </td>
                    <td style={{ color: 'var(--text-muted)' }}>{rec.doctor}</td>
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

export default HealthRecords;
