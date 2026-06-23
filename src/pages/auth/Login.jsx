import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { login as loginApi } from '../../api/authApi';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await loginApi(formData);
      login(res.data);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
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
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Sign in to your PharmAI account</p>
        {error && (
          <div className="alert alert-danger py-2" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: 'var(--danger)', borderRadius: '8px', fontSize: '0.85rem' }}>
            <i className="bi bi-exclamation-circle me-2"></i>{error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="form-dark">
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <div className="position-relative">
              <input type="email" className="form-control" placeholder="Enter your email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label d-flex justify-content-between">
              Password
              <Link to="/forgot-password" style={{ fontSize: '0.8rem' }}>Forgot Password?</Link>
            </label>
            <input type="password" className="form-control" placeholder="Enter your password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} required />
          </div>
          <button type="submit" className="btn-primary-custom w-100 justify-content-center" disabled={loading}>
            {loading ? <><span className="spinner-border spinner-border-sm me-2"></span>Signing in...</> : <><i className="bi bi-box-arrow-in-right"></i>Sign In</>}
          </button>
        </form>
        <p className="text-center mt-4" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          Don't have an account? <Link to="/register">Create Account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
