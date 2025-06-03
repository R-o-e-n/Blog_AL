import { useDispatch } from 'react-redux';
import { createCategory, fetchCategories } from '../redux/categorySlice';
import { useState } from 'react';
import API from '../services/api'; 
import { toast } from 'react-toastify';
export default function CategoryForm() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ name: '', description: '' });

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createCategory(form)).unwrap();
      dispatch(fetchCategories());
      setForm({ name: '', description: '' });
      toast.success("Category created!");
    } catch (err) {
      toast.error(err?.message || "Failed to create category");
    }
  };

  return (
    <div className="form-bg">
      <form className="form-card" onSubmit={handleSubmit}>
        <h2 className="form-title">
          Add <span className="accent">Category</span>
        </h2>
        <div className="form-group">
          <label>Category Name</label>
          <input
            name="name"
            value={form.name}
            placeholder="Category Name"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            placeholder="Description (optional)"
            onChange={handleChange}
            rows={3}
          />
        </div>
        <button type="submit" className="form-btn">
          Create
        </button>
      </form>
    </div>
  );

}
