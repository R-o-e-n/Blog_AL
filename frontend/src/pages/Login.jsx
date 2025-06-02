// Login.jsx (similarly for Register.jsx)
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser(formData));
    if (result.meta.requestStatus === 'fulfilled') {
      toast.success("Logged in successfully!");
      navigate('/');
    } else {
      toast.error(result.payload || "Login failed!");
    }
  };

  return (
    <div className="form-bg">
      <form className="form-card" onSubmit={handleSubmit}>
        <h2 className="form-title">Login to Blog<span className="accent">AL</span></h2>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" onChange={handleChange} placeholder="Enter your email" required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" onChange={handleChange} placeholder="••••••" required />
        </div>
        <button type="submit" className="form-btn" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        {error && <div className="form-error">{error}</div>}
      </form>
    </div>
  );
}
