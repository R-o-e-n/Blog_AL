import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments, deleteComment } from '../redux/commentSlice';
import { Trash } from 'phosphor-react'; // or use FontAwesome/Lucide as needed
import { toast } from 'react-toastify';

export default function CommentList({ postId }) {
  const dispatch = useDispatch();
  const { comments } = useSelector(state => state.comments);
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchComments(postId));
  }, [dispatch, postId]);

  const handleDelete = async (commentId) => {
    try {
      await dispatch(deleteComment(commentId)).unwrap();
      toast.success("Comment deleted!");
    } catch (err) {
      toast.error(err?.message || "Failed to delete comment");
    }
  };

  return (
    <div className="comments-list">
      {Array.isArray(comments) && comments.length > 0 ? (
        comments.map((comment) => {
          const canDelete =
            user &&
            (comment.author?._id === user._id ||
              user.role === 'admin' || user.isAdmin);

          return (
            <div className="comment-card" key={comment._id}>
              <div className="comment-avatar">
                {comment.author?.username
                  ? comment.author.username[0]?.toUpperCase()
                  : "?"}
              </div>
              <div className="comment-main">
                <div className="comment-meta">
                  <span className="comment-author">{comment.author?.username || "Unknown"}</span>
                  <span className="comment-date">
                    {comment.createdAt
                      ? new Date(comment.createdAt).toLocaleDateString()
                      : ""}
                  </span>
                  {canDelete && (
                    <button
                      className="comment-delete-btn"
                      onClick={() => handleDelete(comment._id)}
                      title="Delete comment"
                    >
                      <Trash size={20} weight="fill" color="#f43f5e" />
                    </button>
                  )}
                </div>
                <div className="comment-content">{comment.content}</div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="comment-none">No comments yet.</div>
      )}
    </div>
  );
}
