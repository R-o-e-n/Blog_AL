import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container text-center" style={{ padding: '5rem 0' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn-primary">
        Return Home
      </Link>
    </div>
  );
}