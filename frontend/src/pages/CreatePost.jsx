import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchCategories } from '../redux/categorySlice';
import API from '../services/api'; 
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function CreatePost() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list: categories } = useSelector(state => state.categories);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '', // do të ruajmë _id e kategorisë
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
    if (!formData.category) {
      toast.error("Select a category!");
      return;
    }
    const data = new FormData();
    data.append('title', formData.title);
    data.append('content', formData.content);
    // Për backend-in tënd pritet "categories" si array ose si string? Më shpesh _id, jo emri!
    data.append('categories', formData.category); // vendos id-në e kategorisë
    data.append('image', formData.image);

    try {
      await API.post('/posts', data);
      toast.success("Post created!");
      navigate('/');
    } catch (err) {
      toast.error(err?.response?.data?.error || "Post creation failed");
    }
  };

  return (
    <div className="form-bg">
      <form className="form-card" onSubmit={handleSubmit} encType="multipart/form-data">
        <h2 className="form-title">Create Post</h2>
        <div className="form-group">
          <label>Title</label>
          <input name="title" value={formData.title} placeholder="Title" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Content</label>
          <textarea name="content" value={formData.content} placeholder="Content" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select name="category" value={formData.category} onChange={handleChange} required>
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Image</label>
          <input type="file" name="image" accept="image/*" onChange={handleChange} required />
        </div>
        <button type="submit" className="form-btn">Create</button>
      </form>
    </div>
  );
}
