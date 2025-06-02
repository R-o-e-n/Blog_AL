import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/authSlice';

export default function Navbar() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  
  // Inside your component
  const handleLogout = () => {
    dispatch(logout());
    // Optional: redirect to home
    navigate('/');
  };

  // In your JSX
  {isAuthenticated && (
    <button onClick={handleLogout} className="logout-btn">
      Logout
    </button>
  )}

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">BlogAL</Link>
      </div>
      
      <div className="navbar-links">
        {isAuthenticated ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/create-post">Create Post</Link>
            <span className="username">Welcome, {user?.name}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}