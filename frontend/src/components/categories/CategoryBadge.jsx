import { Link } from 'react-router-dom';

export default function CategoryBadge({ category, onClick }) {
  return (
    <span 
      className="category-badge"
      onClick={onClick}
      style={{ backgroundColor: `#${category.color || '4361ee'}` }}
    >
      {category.name}
    </span>
  );
}