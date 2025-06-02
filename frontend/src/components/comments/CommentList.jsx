import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../../features/categoriesSlice';
import CategoryBadge from './CategoryBadge';

export default function CategoryList() {
  const dispatch = useDispatch();
  const { items: categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="category-list">
      <h3>Categories</h3>
      <div className="category-badges">
        {categories.map(category => (
          <CategoryBadge key={category._id} category={category} />
        ))}
      </div>
    </div>
  );
}