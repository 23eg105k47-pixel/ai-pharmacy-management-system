import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { register as registerApi } from '../../api/authApi';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '', role: 'PHARMACIST' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await registerApi(formData);
      login(res.data.user || res.data);
      navigate('/dashboard');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card fade-in">
        <div className="auth-logo">
          <i className="bi bi-capsule"></i>
        </div>
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">Join PharmAI management system</p>
        {error && (
          <div className="alert alert-danger py-2" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: 'var(--danger)', borderRadius: '8px', fontSize: '0.85rem' }}>
            <i className="bi bi-exclamation-circle me-2"></i>{error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="form-dark">
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-control" placeholder="Enter your name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input type="email" className="form-control" placeholder="Enter your email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Role</label>
            <select className="form-select" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}>
              <option value="PHARMACIST">Pharmacist</option>
              <option value="DOCTOR">Doctor</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          <div className="row">
            <div className="col-6 mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" placeholder="Password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} required />
            </div>
            <div className="col-6 mb-3">
              <label className="form-label">Confirm</label>
              <input type="password" className="form-control" placeholder="Confirm" value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} required />
            </div>
          </div>
          <button type="submit" className="btn-primary-custom w-100 justify-content-center" disabled={loading}>
            {loading ? <><span className="spinner-border spinner-border-sm me-2"></span>Creating...</> : <><i className="bi bi-person-plus"></i>Create Account</>}
          </button>
        </form>
        <p className="text-center mt-4" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
