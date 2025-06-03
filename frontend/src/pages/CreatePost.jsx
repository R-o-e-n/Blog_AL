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
    category: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files && files[0]) {
      setFormData(prev => ({
        ...prev,
        image: files[0]
      }));
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
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
    data.append('categories', formData.category);
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
        {imagePreview && (
          <div style={{ marginBottom: '1.1rem', display: 'flex', justifyContent: 'center' }}>
            <img
              src={imagePreview}
              alt="Preview"
              style={{
                width: 130,
                height: 130,
                objectFit: 'cover',
                borderRadius: 13,
                border: '2px solid #f43f5e2e',
                boxShadow: '0 2px 8px #f43f5e12',
                background: '#fff0f3'
              }}
            />
          </div>
        )}
        <button type="submit" className="form-btn">Create</button>
      </form>
    </div>
  );
}
