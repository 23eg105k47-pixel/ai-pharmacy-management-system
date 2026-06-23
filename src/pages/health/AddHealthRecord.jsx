import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { addHealthRecord } from '../../api/healthApi';

const AddHealthRecord = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    patientName: '', date: '', bloodPressure: '', heartRate: '',
    temperature: '', weight: '', bloodSugar: '', notes: '', doctor: ''
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addHealthRecord({
        ...formData,
        heartRate: parseInt(formData.heartRate),
        temperature: parseFloat(formData.temperature),
        weight: parseFloat(formData.weight),
        bloodSugar: parseInt(formData.bloodSugar)
      });
      navigate('/health-records');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fade-in">
      <div className="page-header">
        <div className="d-flex align-items-center gap-2 mb-1">
          <Link to="/health-records" style={{ color: 'var(--text-muted)' }}><i className="bi bi-arrow-left"></i></Link>
          <h4 className="mb-0">Add Health Record</h4>
        </div>
        <p>Record patient vitals and health metrics</p>
      </div>

      <div className="content-card" style={{ maxWidth: 800 }}>
        <div className="content-card-body">
          <form onSubmit={handleSubmit} className="form-dark">
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Patient Name *</label>
                <input type="text" name="patientName" className="form-control" placeholder="Patient name" value={formData.patientName} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Date *</label>
                <input type="date" name="date" className="form-control" value={formData.date} onChange={handleChange} required />
              </div>
              <div className="col-md-4">
                <label className="form-label">Blood Pressure *</label>
                <input type="text" name="bloodPressure" className="form-control" placeholder="e.g. 120/80" value={formData.bloodPressure} onChange={handleChange} required />
              </div>
              <div className="col-md-4">
                <label className="form-label">Heart Rate (bpm) *</label>
                <input type="number" name="heartRate" className="form-control" placeholder="e.g. 72" value={formData.heartRate} onChange={handleChange} required />
              </div>
              <div className="col-md-4">
                <label className="form-label">Temperature (°F) *</label>
                <input type="number" name="temperature" className="form-control" step="0.1" placeholder="e.g. 98.6" value={formData.temperature} onChange={handleChange} required />
              </div>
              <div className="col-md-4">
                <label className="form-label">Weight (kg) *</label>
                <input type="number" name="weight" className="form-control" step="0.1" placeholder="e.g. 70" value={formData.weight} onChange={handleChange} required />
              </div>
              <div className="col-md-4">
                <label className="form-label">Blood Sugar (mg/dL) *</label>
                <input type="number" name="bloodSugar" className="form-control" placeholder="e.g. 110" value={formData.bloodSugar} onChange={handleChange} required />
              </div>
              <div className="col-md-4">
                <label className="form-label">Doctor *</label>
                <input type="text" name="doctor" className="form-control" placeholder="Doctor name" value={formData.doctor} onChange={handleChange} required />
              </div>
              <div className="col-12">
                <label className="form-label">Notes</label>
                <textarea name="notes" className="form-control" rows="3" placeholder="Clinical notes..." value={formData.notes} onChange={handleChange}></textarea>
              </div>
            </div>
            <div className="d-flex gap-2 mt-4">
              <button type="submit" className="btn-primary-custom" disabled={loading}>
                {loading ? <><span className="spinner-border spinner-border-sm me-2"></span>Saving...</> : <><i className="bi bi-check-lg"></i> Save Record</>}
              </button>
              <Link to="/health-records" className="btn-outline-custom">Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddHealthRecord;
