import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../services/api';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`/posts/${id}`).then(res => setPost(res.data));
  }, [id]);

  if (!post) return <div className="postdetail-loader">Loading post...</div>;

  return (
    <div className="postdetail-wrapper">
      <div className="postdetail-card">
        <div className="postdetail-imagewrap">
          {post.image ? (
            <img src={`http://localhost:8000/uploads/${post.image}`} alt={post.title} />
          ) : (
            <div className="postdetail-img-placeholder">No Image</div>
          )}
        </div>
        <div className="postdetail-content">
          <h2>{post.title}</h2>
          <div className="postdetail-meta">
            <span>
              {post.author?.username ? (
                <>
                  <span className="postdetail-avatar">
                    {post.author.username[0]?.toUpperCase()}
                  </span>
                  <b>{post.author.username}</b>
                </>
              ) : (
                <b>Unknown</b>
              )}
            </span>
            <span className="postdetail-date">
              {post.createdAt && new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>
          <p className="postdetail-text">{post.content}</p>
        </div>
      </div>
      <div className="postdetail-comments">
        <h3>Comments</h3>
        <CommentList postId={id} />
        <CommentForm postId={id} />
      </div>
    </div>
  );
}
