import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { addReminder } from '../../api/reminderApi';

const AddReminder = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    patientName: '', medicineName: '', dosage: '', frequency: 'Once Daily',
    time: '', startDate: '', endDate: '', notes: ''
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addReminder({ ...formData, status: 'Active' });
      navigate('/reminders');
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
          <Link to="/reminders" style={{ color: 'var(--text-muted)' }}><i className="bi bi-arrow-left"></i></Link>
          <h4 className="mb-0">Add New Reminder</h4>
        </div>
        <p>Set up a medicine reminder for a patient</p>
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
                <label className="form-label">Medicine Name *</label>
                <input type="text" name="medicineName" className="form-control" placeholder="Medicine name" value={formData.medicineName} onChange={handleChange} required />
              </div>
              <div className="col-md-4">
                <label className="form-label">Dosage *</label>
                <input type="text" name="dosage" className="form-control" placeholder="e.g. 1 tablet" value={formData.dosage} onChange={handleChange} required />
              </div>
              <div className="col-md-4">
                <label className="form-label">Frequency *</label>
                <select name="frequency" className="form-select" value={formData.frequency} onChange={handleChange}>
                  <option value="Once Daily">Once Daily</option>
                  <option value="Twice Daily">Twice Daily</option>
                  <option value="Three Times">Three Times Daily</option>
                  <option value="Four Times">Four Times Daily</option>
                  <option value="As Needed">As Needed</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">Time *</label>
                <input type="text" name="time" className="form-control" placeholder="e.g. 08:00 AM" value={formData.time} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Start Date *</label>
                <input type="date" name="startDate" className="form-control" value={formData.startDate} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">End Date *</label>
                <input type="date" name="endDate" className="form-control" value={formData.endDate} onChange={handleChange} required />
              </div>
              <div className="col-12">
                <label className="form-label">Notes</label>
                <textarea name="notes" className="form-control" rows="2" placeholder="Additional notes..." value={formData.notes} onChange={handleChange}></textarea>
              </div>
            </div>
            <div className="d-flex gap-2 mt-4">
              <button type="submit" className="btn-primary-custom" disabled={loading}>
                {loading ? <><span className="spinner-border spinner-border-sm me-2"></span>Saving...</> : <><i className="bi bi-check-lg"></i> Save Reminder</>}
              </button>
              <Link to="/reminders" className="btn-outline-custom">Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddReminder;
