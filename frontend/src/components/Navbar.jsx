import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBiohazard } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

export default function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {

    const username = user?.username || "User";
    dispatch(logoutUser());
    toast.info(
      <span>
        👋 Bye <b>{username}</b>, you logged out!
      </span>,
      {
        position: "top-right",
        autoClose: 2500,
        theme: "colored",
        icon: "🦙"
      }
    );
    navigate('/');
  };

  const isAdmin = user?.role === 'admin' || user?.isAdmin === true;

  return (
    <nav className="navbar-pinterest">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          <FontAwesomeIcon icon={faBiohazard} style={{ color: "#a30515", marginRight: 10, fontSize: 30 }} />
          Blog<span className="accent">AL</span>
        </Link>




        <div className="navbar-links">
          {user && (
            <>
              <Link to="/create" className="navbar-link">Create Post</Link>
              {isAdmin && (
                <>
                <Link to="/add-category" className="navbar-link">Add Category</Link>
                <Link to="/manage-categories" className="navbar-link">Update Categories</Link>
                </>
              )}
            </>
          )}
        </div>
        <div className="navbar-actions">
          {user ? (
            <>
              <span className="navbar-user">
                <span className="userdot">{user.username[0].toUpperCase()}</span>
                <span className="ml-1">{user.username}</span>
              </span>
              <button onClick={handleLogout} className="navbar-btn logout">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-btn login">Login</Link>
              <Link to="/register" className="navbar-btn register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
