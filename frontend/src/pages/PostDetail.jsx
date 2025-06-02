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

  if (!post) return <p>Loading post...</p>;

  return (
    <div>
      <h2>{post.title}</h2>
      <img src={`/uploads/${post.image}`} alt={post.title} width="300" />
      <p>{post.content}</p>

      <h3>Comments</h3>
      <CommentList postId={id} />
      <CommentForm postId={id} />
    </div>
  );
}
