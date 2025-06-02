import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../services/api';

export const fetchComments = createAsyncThunk('comments/fetch', async (postId) => {
  const res = await API.get(`/comments/post/${postId}`);
  return res.data;
});

export const addComment = createAsyncThunk('comments/add', async ({ postId, content }) => {
  const res = await API.post('/comments', { postId, content });
  return res.data;
});

const commentSlice = createSlice({
  name: 'comments',
  initialState: { comments: [] },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      });
  }
});

export default commentSlice.reducer;
