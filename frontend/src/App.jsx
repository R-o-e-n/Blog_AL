import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreatePost from './pages/CreatePost';
import PostDetail from './pages/PostDetail';
import CategoryForm from './components/CategoryForm';
import Navbar from './components/Navbar';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
       <div className="with-navbar">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/add-category" element={<CategoryForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      </div>
    </BrowserRouter>
    
  );
}

export default App;
