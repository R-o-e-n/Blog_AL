import { Link } from 'react-router-dom';

export default function PostItem({ post, currentUser, onDelete }) {
  const isAuthor = currentUser && currentUser._id === post.author?._id;

  return (
    <div className="post-card">
      {post.image && (
        <img 
          src={`/uploads/${post.image}`}
          alt={post.title}
          className="post-image"
        />
      )}
      <div className="post-content">
        <h3>{post.title}</h3>
        <p>{post.content.substring(0, 100)}...</p>
        
        <div className="post-meta">
          <div className="comment-count">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
            {post.comments?.length || 0}
          </div>
          
          <div className="post-actions">
            <Link to={`/posts/${post._id}`} className="read-more">
              Read More
            </Link>
            {isAuthor && (
              <button 
                onClick={() => onDelete(post._id)}
                className="delete-btn"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}