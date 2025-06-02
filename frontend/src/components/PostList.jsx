import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../redux/postsSlice';
import { Link } from 'react-router-dom';

export default function PostList() {
  const dispatch = useDispatch();
  const { posts = [], loading, error } = useSelector(state => state.posts);
  const { user } = useSelector(state => state.auth);
  const [showMyPosts, setShowMyPosts] = useState(false);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const myPosts = posts.filter(post => user && post.author && post.author._id === user._id);

  if (loading) return <div className="posts-loader">Loading...</div>;
  if (error) return <div className="posts-error">{error}</div>;

  return (
    <div className="posts-wrapper">
      {/* Section Tabs */}
      {user && (
        <div className="posts-tabs">
          <button
            className={!showMyPosts ? 'active' : ''}
            onClick={() => setShowMyPosts(false)}
          >
            All Posts
          </button>
          <button
            className={showMyPosts ? 'active' : ''}
            onClick={() => setShowMyPosts(true)}
          >
            My Posts
          </button>
        </div>
      )}

      {/* Cards Grid */}
      <div className="posts-grid">
        {(showMyPosts ? myPosts : posts).map(post => (
          <div key={post._id} className="post-card">
            <div className="post-img-wrap">
              {post.image ? (
                <img src={`http://localhost:8000/uploads/${post.image}`} alt={post.title} />
              ) : (
                <div className="post-img-placeholder">No Image</div>
              )}
            </div>
            <div className="post-card-content">
              <h2>{post.title}</h2>
              <div className="post-meta">
                <span>by <b>{post.author?.username || "Unknown"}</b></span>
              </div>
              <p>{post.content?.substring(0, 100)}...</p>
              <Link to={`/posts/${post._id}`}>
                <button className="readmore-btn">Read More</button>
              </Link>
            </div>
          </div>
        ))}
        {(showMyPosts ? myPosts : posts).length === 0 && (
          <div className="no-posts">No posts found.</div>
        )}
      </div>
    </div>
  );
}
