import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../redux/commentSlice';
import { toast } from 'react-toastify';

export default function CommentForm({ postId }) {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      />
      <button type="submit" className="commentform-btn">
        Submit
      </button>
    </form>
  );
}
