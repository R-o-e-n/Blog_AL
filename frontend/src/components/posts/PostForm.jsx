import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createPost, fetchCategories } from '../../features/postsSlice';
import { useEffect } from 'react';

export default function PostForm() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    categories: []
  });
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { status, categories } = useSelector((state) => state.posts);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated || user?.role !== 'admin') {
    return (
      <div className="alert alert-warning">
        Only administrators can create posts.
      </div>
    );
  }
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryToggle = (categoryId) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter(id => id !== categoryId)
        : [...prev.categories, categoryId]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('content', formData.content);
    data.append('categories', JSON.stringify(formData.categories));
    if (image) data.append('image', image);

    try {
      await dispatch(createPost(data)).unwrap();
      // Reset form
      setFormData({ title: '', content: '', categories: [] });
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
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          required
        />
        <textarea
          placeholder="Content"
          value={formData.content}
          onChange={(e) => setFormData({...formData, content: e.target.value})}
          required
        />
        
        <div className="category-selection">
          <h4>Categories:</h4>
          {categories.map(category => (
            <label key={category._id}>
              <input
                type="checkbox"
                checked={formData.categories.includes(category._id)}
                onChange={() => handleCategoryToggle(category._id)}
              />
              {category.name}
            </label>
          ))}
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Posting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}