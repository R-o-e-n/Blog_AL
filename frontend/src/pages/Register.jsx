// Register.jsx
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '', email: '', password: '', password2: ''
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(registerUser(formData));
    if (result.meta.requestStatus === 'fulfilled') {
      toast.success("Registered! You can now log in.");
      navigate('/login');
    } else {
      toast.error(result.payload || "Register failed!");
    }
  };

  return (
    <div className="form-bg">
      <form className="form-card" onSubmit={handleSubmit}>
        <h2 className="form-title">Register to Blog<span className="accent">AL</span></h2>
        <div className="form-group">
          <label>Username</label>
          <input name="username" onChange={handleChange} placeholder="Enter your username" required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" onChange={handleChange} placeholder="Enter your email" required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" onChange={handleChange} placeholder="••••••" required />
        </div>
        <div className="form-group">
          <label>Repeat Password</label>
          <input type="password" name="password2" onChange={handleChange} placeholder="••••••" required />
        </div>
        <button type="submit" className="form-btn" disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register'}
        </button>
        {error && <div className="form-error">{error}</div>}
      </form>
    </div>
  );
}
