import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../../features/categoriesSlice';
import CategoryBadge from './CategoryBadge';

export default function CategoryList({ onSelectCategory }) {
  const dispatch = useDispatch();
  const { items: categories, status } = useSelector((state) => state.categories);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  return (
    <div className="category-list">
      <h3>Categories</h3>
      <div className="category-badges">
        {categories.map((category) => (
          <CategoryBadge 
            key={category._id} 
            category={category}
            onClick={() => onSelectCategory?.(category._id)}
          />
        ))}
      </div>
    </div>
  );
}