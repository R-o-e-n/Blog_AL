import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPostById } from '../../features/postsSlice';
import CommentList from '../comments/CommentList';
import CommentForm from '../comments/CommentForm';
import CategoryBadge from '../categories/CategoryBadge';
useEffect(() => {
  if (id) {
    dispatch(fetchPostById(id))
      .unwrap()
      .catch((err) => {
        console.error('Failed to fetch post:', err);
      });
  }
}, [id, dispatch]);
export default function PostDetail() {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentPost, status } = useSelector((state) => state.posts);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    dispatch(fetchPostById(id));
    // Check if we're coming from a direct link or via navigation
    setShowComments(location.state?.showComments ?? false);
  }, [id, dispatch, location.state]);

  if (status === 'loading') return <div>Loading...</div>;
  if (!currentPost) return <div>Post not found</div>;

  return (
    <div className="post-detail">
      <article>
        <h1>{currentPost.title}</h1>
        
        <div className="post-categories">
          {currentPost.categories?.map(category => (
            <CategoryBadge key={category._id} category={category} />
          ))}
        </div>

        {currentPost.image && (
          <img 
            src={`/api/uploads/${currentPost.image}`} 
            alt={currentPost.title}
            className="post-image"
          />
        )}

        <div className="post-content">
          {currentPost.content}
        </div>
      </article>

      <button 
        onClick={() => setShowComments(!showComments)}
        className="toggle-comments-btn"
      >
        {showComments ? 'Hide Comments' : 'Show Comments'}
      </button>

      {showComments && (
        <section className="comments-section">
          <h2>Comments ({currentPost.comments?.length || 0})</h2>
          <CommentList comments={currentPost.comments || []} />
          <CommentForm postId={id} />
        </section>
      )}
    </div>
  );
}