import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../services/api';

export const fetchCategories = createAsyncThunk('categories/fetch', async () => {
  const res = await axios.get('/categories');
  return res.data;
});

export const createCategory = createAsyncThunk('categories/create', async (name) => {
  const res = await axios.post('/categories', { name });
  return res.data;
});

const categorySlice = createSlice({
  name: 'categories',
  initialState: { list: [], loading: false, error: null },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.pending, state => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.list.push(action.payload);
      });
  }
});

export default categorySlice.reducer;
