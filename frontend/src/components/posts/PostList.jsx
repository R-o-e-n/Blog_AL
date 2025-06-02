import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, deletePost } from '../../features/postsSlice'; // Changed from fetchPostById to fetchPosts
import PostItem from './PostItem';

export default function PostList() {
  const dispatch = useDispatch();
  const { items: posts, status, error } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchPosts()); // Now using fetchPosts instead of fetchPostById
  }, [dispatch]);

  const handleDelete = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await dispatch(deletePost(postId));
      dispatch(fetchPosts()); // Refresh the list after deletion
    }
  };

  if (status === 'loading') return <div>Loading posts...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostItem 
          key={post._id} 
          post={post} 
          currentUser={user}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}