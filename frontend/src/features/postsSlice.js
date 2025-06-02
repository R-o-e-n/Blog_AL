import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPostById = createAsyncThunk(
  'posts/fetchPostById',
  async (postId) => {
    const response = await axios.get(`/posts/${postId}`);
    return response.data;
  }
);
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
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get('/api/posts');
  return response.data;
});
export const fetchCategories = createAsyncThunk(
  'posts/fetchCategories',
  async () => {
    const response = await axios.get('/api/categories');
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

export const addCategory = createAsyncThunk(
  'posts/addCategory',
  async ({ postId, categoryId }, { getState }) => {
    const { token } = getState().auth;
    const response = await axios.patch(
      `/api/posts/${postId}/categories`,
      { categoryId },
      { headers: { 'x-auth-token': token } }
    );
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

// Comment-related async thunks
export const addComment = createAsyncThunk(
  'posts/addComment',
  async ({ postId, content }, { getState }) => {
    const { token } = getState().auth;
    const response = await axios.post(
      `/api/posts/${postId}/comments`,
      { content },
      { headers: { 'x-auth-token': token } }
    );
    return { postId, comment: response.data };
  }
);

export const deleteComment = createAsyncThunk(
  'posts/deleteComment',
  async ({ postId, commentId }, { getState }) => {
    const { token } = getState().auth;
    await axios.delete(`/api/posts/${postId}/comments/${commentId}`, {
      headers: { 'x-auth-token': token }
    });
    return { postId, commentId };
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    categories: [],
    status: 'idle',
    error: null,
    filteredItems: []
  },
  reducers: {
    filterByCategory: (state, action) => {
      if (!action.payload) {
        state.filteredItems = state.items;
      } else {
        state.filteredItems = state.items.filter(post => 
          post.categories?.some(cat => cat._id === action.payload)
        );
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Posts
      .addCase(fetchPostById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
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
        state.items.unshift(action.payload);
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
      })
      
      // Fetch Categories
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      
      // Add Category
      .addCase(addCategory.fulfilled, (state, action) => {
        const index = state.items.findIndex(p => p._id === action.payload._id);
        if (index !== -1) state.items[index] = action.payload;
      })
      
      // Add Comment
      .addCase(addComment.fulfilled, (state, action) => {
        const { postId, comment } = action.payload;
        const postIndex = state.items.findIndex(post => post._id === postId);
        if (postIndex !== -1) {
          if (!state.items[postIndex].comments) {
            state.items[postIndex].comments = [];
          }
          state.items[postIndex].comments.push(comment);
        }
      })
      
      // Delete Comment
      .addCase(deleteComment.fulfilled, (state, action) => {
        const { postId, commentId } = action.payload;
        const postIndex = state.items.findIndex(post => post._id === postId);
        if (postIndex !== -1) {
          state.items[postIndex].comments = state.items[postIndex].comments.filter(
            comment => comment._id !== commentId
          );
        }
      });
  }
});

export const { filterByCategory } = postsSlice.actions;
export default postsSlice.reducer;