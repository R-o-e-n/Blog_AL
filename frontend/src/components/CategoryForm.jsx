import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { createCategory } from '../redux/categorySlice';

export default function CategoryForm() {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  const isAdmin = user?.role === 'admin';

  if (!isAdmin) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    dispatch(createCategory(name));
    setName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create New Category</h3>
      <input
        type="text"
        value={name}
        placeholder="Category name"
        onChange={e => setName(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}
