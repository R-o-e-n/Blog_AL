import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, deletePost, setCategoryFilter } from '../redux/postsSlice';
import { fetchCategories } from '../redux/categorySlice';
import { Link, useNavigate } from 'react-router-dom';
import { Trash, PencilSimple } from 'phosphor-react'; 
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export default function PostList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { posts = [], loading, error, categoryFilter } = useSelector(state => state.posts);
  const { list: categories } = useSelector(state => state.categories);
  const { user } = useSelector(state => state.auth);
  const [showMyPosts, setShowMyPosts] = useState(false);

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchCategories());
  }, [dispatch]);

  
  const myPosts = posts.filter(
    post => user && post.author && post.author._id === user._id
  );

  
  const postsToShow = showMyPosts
    ? (categoryFilter
        ? myPosts.filter(post =>
            Array.isArray(post.categories)
              ? post.categories.some(cat => cat._id === categoryFilter || cat === categoryFilter)
              : post.categories === categoryFilter
          )
        : myPosts
      )
    : (categoryFilter
        ? posts.filter(post =>
            Array.isArray(post.categories)
              ? post.categories.some(cat => cat._id === categoryFilter || cat === categoryFilter)
              : post.categories === categoryFilter
          )
        : posts
      );

  const handleDelete = async (postId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You can't undo this action!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f43f5e',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Yes, delete it!',
      background: '#fff',
      color: '#22223b'
    });

    if (result.isConfirmed) {
      try {
        await dispatch(deletePost(postId)).unwrap();
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Your post has been deleted.',
          timer: 1700,
          showConfirmButton: false,
          background: '#fff',
          color: '#be123c'
        });
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: err?.message || 'Failed to delete post',
          background: '#fff',
          color: '#be123c'
        });
      }
    }
  };

  if (loading) return <div className="posts-loader">Loading...</div>;
  if (error) return <div className="posts-error">{error}</div>;

  return (
    <div className="posts-wrapper">
      
      <div className="posts-category-filter" style={{ marginBottom: '1rem' }}>
        <select
          value={categoryFilter || ''}
          onChange={e => dispatch(setCategoryFilter(e.target.value))}
          className="navbar-category-filter"
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
      </div>

      
      {user && (
        <div className="posts-tabs">
          <button
            className={!showMyPosts ? 'active' : ''}
            onClick={() => setShowMyPosts(false)}
          >
            All Posts
          </button>
          <button
            className={showMyPosts ? 'active' : ''}
            onClick={() => setShowMyPosts(true)}
          >
            My Posts
          </button>
        </div>
      )}

      
      <div className="posts-grid">
        {postsToShow.map(post => {
          const canEditOrDelete =
            user &&
            (post.author?._id === user._id || user.role === 'admin' || user.isAdmin);

          return (
            <div key={post._id} className="post-card">
              <div className="post-img-wrap">
                {post.image ? (
                  <img src={`http://localhost:8000/uploads/${post.image}`} alt={post.title} />
                ) : (
                  <div className="post-img-placeholder">No Image</div>
                )}
              </div>
              <div className="post-card-content">
                <h2>{post.title}</h2>
                <div className="post-meta">
                  <span>by <b>{post.author?.username || "Unknown"}</b></span>
                </div>
                <p>{post.content?.substring(0, 100)}...</p>
                <div style={{ display: 'flex', gap: '0.7rem', marginTop: '0.6rem', alignItems: 'center' }}>
                  <Link to={`/posts/${post._id}`}>
                    <button className="readmore-btn">Read More</button>
                  </Link>
                  {canEditOrDelete && (
                    <>
                      <Link to={`/edit/${post._id}`} className="post-edit-btn" title="Edit">
                        <PencilSimple size={21} weight="bold" color="#2563eb" style={{ verticalAlign: 'middle' }} />
                      </Link>
                      <button
                        className="post-delete-btn"
                        title="Delete"
                        onClick={() => handleDelete(post._id)}
                      >
                        <Trash size={21} weight="fill" color="#f43f5e" style={{ verticalAlign: 'middle' }} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {postsToShow.length === 0 && (
          <div className="no-posts">No posts found.</div>
        )}
      </div>
    </div>
  );
}
