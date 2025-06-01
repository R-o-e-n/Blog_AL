import { Link } from 'react-router-dom';

export default function PostItem({ post, currentUser, onDelete }) {
  const isAuthor = currentUser && currentUser._id === post.author._id;

  return (
    <div className="post-item">
      <h3>
        <Link to={`/posts/${post._id}`}>{post.title}</Link>
      </h3>
      <p>{post.content}</p>
      {post.image && (
        <img 
          src={`/api/uploads/${post.image}`} 
          alt={post.title}
          className="post-image"
        />
      )}
      <div className="post-meta">
        <span>By: {post.author.username}</span>
        {isAuthor && (
          <div className="post-actions">
            <Link to={`/posts/edit/${post._id}`} className="btn-edit">
              Edit
            </Link>
            <button 
              onClick={() => onDelete(post._id)}
              className="btn-delete"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}