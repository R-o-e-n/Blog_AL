import PostList from '../components/posts/PostList';
import PostForm from '../components/posts/PostForm';

export default function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Blog Al</h1>
      <PostForm />
      <PostList />
    </div>
  );
}