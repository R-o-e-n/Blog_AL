import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../features/authSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: ''
  });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.password2) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res = await axios.post('/api/auth/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      dispatch(setCredentials(res.data));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="auth-form">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) => setFormData({...formData, username: e.target.value})}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={formData.password2}
          onChange={(e) => setFormData({...formData, password2: e.target.value})}
          required
        />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}