import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import API from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updatePost } from '../redux/postsSlice';
import { fetchCategories } from '../redux/categorySlice';

export default function PostItem() {
  const { id } = useParams();
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
  const [loading, setLoading] = useState(true);

  // Merr postin ekzistues dhe kategorit
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await API.get(`/posts/${id}`);
        const post = res.data;
        setFormData({
          title: post.title,
          content: post.content,
          category: Array.isArray(post.categories) && post.categories.length > 0
            ? post.categories[0]._id || post.categories[0]
            : '',
          image: null,
        });
        setImagePreview(post.image
          ? `http://localhost:8000/uploads/${post.image}`
          : null
        );
        setLoading(false);
      } catch (err) {
        toast.error('Failed to fetch post');
        setLoading(false);
      }
    }
    fetchData();
    dispatch(fetchCategories());
  }, [id, dispatch]);

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

    // Vetëm nëse është zgjedhur foto e re, ndryshe backend do mbajë të vjetrën
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      await dispatch(updatePost({ id, updatedData: data })).unwrap();
      toast.success("Post updated!");
      navigate('/');
    } catch (err) {
      toast.error(err?.response?.data?.error || "Post update failed");
    }
  };

  if (loading) return <div className="postdetail-loader">Loading post...</div>;

  return (
    <div className="form-bg">
      <form className="form-card" onSubmit={handleSubmit} encType="multipart/form-data">
        <h2 className="form-title">Edit Post</h2>
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
          <input type="file" name="image" accept="image/*" onChange={handleChange} />
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
        <button type="submit" className="form-btn">Update</button>
      </form>
    </div>
  );
}
