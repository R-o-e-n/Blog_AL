export default function CommentList({ comments }) {
  return (
    <div className="comment-list">
      {comments.map(comment => (
        <div key={comment._id} className="comment">
          <div className="comment-header">
            <strong>{comment.author.username}</strong>
            <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
          </div>
          <p className="comment-content">{comment.content}</p>
        </div>
      ))}
    </div>
  );
}