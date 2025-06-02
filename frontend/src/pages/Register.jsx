import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector(state => state.auth);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: ''
  });

  const [matchError, setMatchError] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (name === 'password' || name === 'password2') {
      if (formData.password !== formData.password2) {
        setMatchError('Passwords do not match');
      } else {
        setMatchError('');
      }
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (formData.password !== formData.password2) {
      setMatchError('Passwords do not match');
      return;
    }
    const result = await dispatch(registerUser(formData));
    if (result.meta.requestStatus === 'fulfilled') {
      navigate('/login');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password2"
        placeholder="Confirm Password"
        value={formData.password2}
        onChange={handleChange}
        required
      />
      {matchError && <p style={{ color: 'red' }}>{matchError}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" disabled={isLoading}>Register</button>
    </form>
  );
}
