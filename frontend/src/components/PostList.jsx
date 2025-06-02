import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../redux/postsSlice';
import { Link } from 'react-router-dom';

export default function PostList() {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector(state => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {posts.map(post => (
        <div key={post._id} className="post-preview">
          <Link to={`/posts/${post._id}`}>
            <h2>{post.title}</h2>
          </Link>
          <img src={`/uploads/${post.image}`} alt={post.title} width="200" />
          <p>{post.content.substring(0, 100)}...</p>
        </div>
      ))}
    </div>
  );
}
