import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../../features/postsSlice';

export default function CommentForm({ postId }) {
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    
    dispatch(addComment({ postId, content }));
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a comment..."
        required
      />
      <button type="submit">Post Comment</button>
    </form>
  );
}