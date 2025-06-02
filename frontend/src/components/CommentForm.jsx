import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../redux/commentSlice';

export default function CommentForm({ postId }) {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addComment({ postId, text }));
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={text} onChange={e => setText(e.target.value)} required />
      <button type="submit">Submit</button>
    </form>
  );
}
