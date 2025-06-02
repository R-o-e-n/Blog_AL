import PostList from '../components/posts/PostList';

export default function Home() {
  return (
    <div className="container">
      <header className="hero">
        <h1>Miresevini tek BlogAL</h1>
        <p>Zbulo post nga komuniteti me i modh i blogjeve</p>
      </header>
      <PostList />
    </div>
  );
}