import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../services/api';

export const fetchPosts = createAsyncThunk('posts/fetch', async () => {
  const res = await API.get('/posts');
  return res.data;
});
export const deletePost = createAsyncThunk(
  'posts/delete',
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/posts/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.error || 'Failed to delete');
    }
  }
);
export const updatePost = createAsyncThunk('posts/update', async ({ id, updatedData }, { rejectWithValue }) => {
  try {
    const res = await API.put(`/posts/${id}`, updatedData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
  } catch (err) {
    return rejectWithValue(err?.response?.data?.error || 'Failed to update');
  }
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: { posts: [], loading: false, error: null , categoryFilter: ""},
  reducers: {
    setCategoryFilter: (state, action) => {
      state.categoryFilter = action.payload;
    }},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.posts = state.posts.map(post =>
          post._id === action.payload._id ? action.payload : post
        );
      });
  }
});

export const { setCategoryFilter } = postsSlice.actions;
export default postsSlice.reducer;
