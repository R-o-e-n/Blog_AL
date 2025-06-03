import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment } from '../redux/commentSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function CommentForm({ postId }) {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.info("You must be logged in to comment!");
      setTimeout(() => navigate('/login'), 1300);
      return;
    }
    try {
      await dispatch(addComment({ postId, content: text })).unwrap();
      setText('');
      toast.success("Comment added!");
    } catch (err) {
      toast.error(err?.message || "Failed to add comment");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="commentform">
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Write a comment..."
        required
        className="commentform-input"
        rows={3}
        disabled={!user}
      />
      <button
        type="submit"
        className="commentform-btn"
        disabled={!user}
      >
        Submit
      </button>
      {!user && (
        <div className="commentform-warning">
          You must <a href="/login" style={{ color: '#f43f5e', fontWeight: 600 }}>log in</a> to comment!
        </div>
      )}
    </form>
  );
}
