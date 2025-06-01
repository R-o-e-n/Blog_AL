import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createPost } from '../../features/postsSlice';

export default function PostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { status } = useSelector((state) => state.posts);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) formData.append('image', image);

    try {
      await dispatch(createPost(formData)).unwrap();
      
      setTitle('');
      setContent('');
      setImage(null);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="post-form">
      <h3>Create New Post</h3>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button 
          type="submit"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Posting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}