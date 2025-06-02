import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPostById } from '../../features/postsSlice';
import CommentList from '../comments/CommentList';
import CommentForm from '../comments/CommentForm';
import CategoryBadge from '../categories/CategoryBadge';

export default function PostDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentPost, status } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPostById(id));
  }, [id, dispatch]);

  if (status === 'loading') return <div>Loading...</div>;

  return (
    <div className="post-detail">
      <article>
        <h1>{currentPost?.title}</h1>
        
        <div className="post-categories">
          {currentPost?.categories.map(category => (
            <CategoryBadge key={category._id} category={category} />
          ))}
        </div>

        {currentPost?.image && (
          <img 
            src={`/api/uploads/${currentPost.image}`} 
            alt={currentPost.title}
            className="post-image"
          />
        )}

        <div className="post-content">
          {currentPost?.content}
        </div>
      </article>

      <section className="comments-section">
        <h2>Comments</h2>
        <CommentForm postId={id} />
        <CommentList comments={currentPost?.comments || []} />
      </section>
    </div>
  );
}