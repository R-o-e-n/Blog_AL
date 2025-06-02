import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments } from '../redux/commentSlice';

export default function CommentList({ postId }) {
  const dispatch = useDispatch();
  const { comments } = useSelector(state => state.comments);

  useEffect(() => {
    dispatch(fetchComments(postId));
  }, [postId]);

  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment._id}>{comment.text}</li>
      ))}
    </ul>
  );
}
