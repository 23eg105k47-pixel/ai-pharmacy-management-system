import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { addPatient } from '../../api/patientApi';

const AddPatient = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '', age: '', gender: 'Male', phone: '', email: '', address: '',
    bloodGroup: '', allergies: '', condition: '', doctor: ''
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addPatient({ ...formData, age: parseInt(formData.age), lastVisit: new Date().toISOString().split('T')[0] });
      navigate('/patients');
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
          <Link to="/patients" style={{ color: 'var(--text-muted)' }}><i className="bi bi-arrow-left"></i></Link>
          <h4 className="mb-0">Add New Patient</h4>
        </div>
        <p>Register a new patient in the system</p>
      </div>

      <div className="content-card" style={{ maxWidth: 800 }}>
        <div className="content-card-body">
          <form onSubmit={handleSubmit} className="form-dark">
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Full Name *</label>
                <input type="text" name="name" className="form-control" placeholder="Patient full name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="col-md-3">
                <label className="form-label">Age *</label>
                <input type="number" name="age" className="form-control" placeholder="Age" value={formData.age} onChange={handleChange} required />
              </div>
              <div className="col-md-3">
                <label className="form-label">Gender *</label>
                <select name="gender" className="form-select" value={formData.gender} onChange={handleChange}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Phone *</label>
                <input type="tel" name="phone" className="form-control" placeholder="Phone number" value={formData.phone} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input type="email" name="email" className="form-control" placeholder="Email address" value={formData.email} onChange={handleChange} />
              </div>
              <div className="col-12">
                <label className="form-label">Address</label>
                <input type="text" name="address" className="form-control" placeholder="Full address" value={formData.address} onChange={handleChange} />
              </div>
              <div className="col-md-4">
                <label className="form-label">Blood Group</label>
                <select name="bloodGroup" className="form-select" value={formData.bloodGroup} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">Medical Condition</label>
                <input type="text" name="condition" className="form-control" placeholder="e.g. Diabetes" value={formData.condition} onChange={handleChange} />
              </div>
              <div className="col-md-4">
                <label className="form-label">Attending Doctor</label>
                <input type="text" name="doctor" className="form-control" placeholder="Doctor name" value={formData.doctor} onChange={handleChange} />
              </div>
              <div className="col-12">
                <label className="form-label">Allergies</label>
                <textarea name="allergies" className="form-control" rows="2" placeholder="Known allergies..." value={formData.allergies} onChange={handleChange}></textarea>
              </div>
            </div>
            <div className="d-flex gap-2 mt-4">
              <button type="submit" className="btn-primary-custom" disabled={loading}>
                {loading ? <><span className="spinner-border spinner-border-sm me-2"></span>Saving...</> : <><i className="bi bi-check-lg"></i> Save Patient</>}
              </button>
              <Link to="/patients" className="btn-outline-custom">Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPatient;
