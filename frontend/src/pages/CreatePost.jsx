import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchCategories } from '../redux/categorySlice';
import API from '../services/api'; 
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list: categories } = useSelector(state => state.categories);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    image: null,
  });

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('content', formData.content);
    data.append('categories', formData.category);
    data.append('image', formData.image);

    try {
      await API.post('/posts', data); 
      navigate('/');
    } catch (err) {
      console.error("Post creation error:", err);
      alert("Failed to create post: " + (err?.response?.data?.message || err.message));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Post</h2>
      <input name="title" placeholder="Title" onChange={handleChange} required />
      <textarea name="content" placeholder="Content" onChange={handleChange} required />
      <select name="category" onChange={handleChange} required>
        <option value="">Select Category</option>
        {categories.map(cat => (
          <option key={cat._id} value={cat.name}>{cat.name}</option>
        ))}
      </select>
      <input type="file" name="image" accept="image/*" onChange={handleChange} required />
      <button type="submit">Create</button>
    </form>
  );
}
