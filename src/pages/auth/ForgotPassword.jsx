import { useState } from 'react';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../../api/authApi';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await forgotPassword(email);
      setSent(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card fade-in">
        <div className="auth-logo">
          <i className="bi bi-shield-lock"></i>
        </div>
        <h2 className="auth-title">Reset Password</h2>
        <p className="auth-subtitle">Enter your email to receive a reset link</p>
        {sent ? (
          <div className="text-center">
            <div className="stat-card-icon green mx-auto mb-3"><i className="bi bi-check-lg"></i></div>
            <h6 style={{ color: 'var(--text-primary)' }}>Email Sent!</h6>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Check your inbox for password reset instructions.</p>
            <Link to="/login" className="btn-primary-custom justify-content-center">Back to Login</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="form-dark">
            <div className="mb-4">
              <label className="form-label">Email Address</label>
              <input type="email" className="form-control" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <button type="submit" className="btn-primary-custom w-100 justify-content-center" disabled={loading}>
              {loading ? <><span className="spinner-border spinner-border-sm me-2"></span>Sending...</> : <><i className="bi bi-envelope"></i>Send Reset Link</>}
            </button>
            <p className="text-center mt-4" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              <Link to="/login"><i className="bi bi-arrow-left me-1"></i>Back to Login</Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
