import { Link } from 'react-router-dom';

export default function PostItem({ post }) {
  return (
    <div className="post-item">
      {post.image && (
        <img 
          src={`/api/uploads/${post.image}`} 
          alt={post.title}
          className="post-thumbnail"
        />
      )}
      <div className="post-preview">
        <h3>
          <Link to={`/posts/${post._id}`}>{post.title}</Link>
        </h3>
        <p className="post-excerpt">
          {post.content.substring(0, 100)}...
        </p>
        <div className="post-meta">
          <span>{post.comments.length} comments</span>
          <Link to={`/posts/${post._id}`} className="read-more">
            Read More →
          </Link>
        </div>
      </div>
    </div>
  );
}