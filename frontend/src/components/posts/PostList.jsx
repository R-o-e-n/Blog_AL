import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../features/postsSlice';

export default function PostList() {
  const dispatch = useDispatch();
  const { items: posts, status, error } = useSelector((state) => state.posts);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <div className="post-list">
      {posts.map((post) => (
        <div key={post._id} className="post-card">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          {post.image && (
            <img 
              src={`/api/uploads/${post.image}`}
              alt={post.title}
              className="post-image"
            />
          )}
        </div>
      ))}
    </div>
  );
}