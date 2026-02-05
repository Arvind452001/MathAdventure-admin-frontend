'use client';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginApi } from '../api/StudentApi';

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await loginApi(formData);
      localStorage.setItem('token', response.data.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f5f5, #eaeaea)',
        padding: '2rem',
      }}
    >
      <div
        className="card shadow-lg"
        style={{
          width: '100%',
          maxWidth: '420px',
          borderRadius: '18px',
          padding: '8px',
        }}
      >
        <div
          className="card-body"
          style={{
            padding: '32px 28px',
          }}
        >
          {/* Logo */}
          <div className="text-center mb-4">
            <img
              src="/assets/images/logo.png"
              alt="logo"
              style={{ width: '150px' }}
            />
          </div>

          <h4
            className="text-center mb-4"
            style={{ fontWeight: 600, color: '#333' }}
          >
            Admin Login
          </h4>

          {error && (
            <div className="alert alert-danger py-2 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label" style={{ fontWeight: 500 }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="admin@example.com"
                value={formData.email}
                onChange={handleChange}
                style={{
                  borderRadius: '10px',
                  padding: '10px 12px',
                }}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label" style={{ fontWeight: 500 }}>
                Password
              </label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="••••••"
                value={formData.password}
                onChange={handleChange}
                style={{
                  borderRadius: '10px',
                  padding: '10px 12px',
                }}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                backgroundColor: '#651d32',
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                padding: '12px',
                fontWeight: 600,
                letterSpacing: '0.5px',
                opacity: loading ? 0.8 : 1,
              }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
