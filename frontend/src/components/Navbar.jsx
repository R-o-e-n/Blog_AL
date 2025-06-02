import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/authSlice';

export default function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };
  const isAdmin = user?.role === 'admin' || user?.isAdmin === true;
  
  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid gray' }}>
      <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>

      {user ? (
        <>
          <Link to="/create" style={{ marginRight: '1rem' }}>Create Post</Link>
          {isAdmin && (
            <Link to="/add-category" style={{ marginRight: '1rem' }}>Add Category</Link>
          )}
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ marginRight: '1rem' }}>Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}
