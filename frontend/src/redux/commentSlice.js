import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../services/api';

export const fetchComments = createAsyncThunk('comments/fetch', async (postId) => {
  const res = await axios.get(`/comments/post/${postId}`);
  return res.data;
});

export const addComment = createAsyncThunk('comments/add', async ({ postId, text }) => {
  const res = await axios.post('/comments', { postId, text });
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
