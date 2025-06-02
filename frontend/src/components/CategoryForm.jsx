import { useDispatch } from 'react-redux';
import { createCategory, fetchCategories } from '../redux/categorySlice';
import { useState } from 'react';
import API from '../services/api'; 

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
      alert("Category created!"); 
    } catch (err) {
      alert("Error: " + (err?.message || JSON.stringify(err)));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Category</h2>
      <input name="name" value={form.name} placeholder="Category Name" onChange={handleChange} required />
      <textarea name="description" value={form.description} placeholder="Description" onChange={handleChange} />
      <button type="submit">Create</button>
    </form>
  );
}
