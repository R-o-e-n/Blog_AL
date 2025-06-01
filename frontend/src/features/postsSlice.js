import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunks për të gjitha operacionet
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get('/api/posts');
  return response.data;
});

export const createPost = createAsyncThunk(
  'posts/createPost', 
  async (postData, { getState }) => {
    const { token } = getState().auth;
    const response = await axios.post('/api/posts', postData, {
      headers: {
        'x-auth-token': token,
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  }
);

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async ({ postId, postData }, { getState }) => {
    const { token } = getState().auth;
    const response = await axios.put(`/api/posts/${postId}`, postData, {
      headers: {
        'x-auth-token': token
      }
    });
    return response.data;
  }
);

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (postId, { getState }) => {
    const { token } = getState().auth;
    await axios.delete(`/api/posts/${postId}`, {
      headers: {
        'x-auth-token': token
      }
    });
    return postId;
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Posts
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      
      // Create Post
      .addCase(createPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.unshift(action.payload); // Shton postin e ri në fillim
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      
      // Update Post
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.items.findIndex(post => post._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      
      // Delete Post
      .addCase(deletePost.fulfilled, (state, action) => {
        state.items = state.items.filter(post => post._id !== action.payload);
      });
  }
});

export default postsSlice.reducer;