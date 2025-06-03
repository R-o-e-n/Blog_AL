import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../services/api';

export const fetchCategories = createAsyncThunk('categories/fetch', async () => {
  const res = await API.get('/categories');
  return res.data;
});

export const createCategory = createAsyncThunk('categories/create', async ({ name, description }) => {
  const res = await API.post('/categories', { name, description });
  return res.data;
});
export const deleteCategory = createAsyncThunk('categories/delete', async (id, { rejectWithValue }) => {
  try {
    await API.delete(`/categories/${id}`);
    return id;
  } catch (err) {
    return rejectWithValue(err?.response?.data?.error || 'Failed to delete');
  }
});
export const updateCategory = createAsyncThunk(
  'categories/update',
  async ({ id, name, description }, { rejectWithValue }) => {
    try {
      const res = await API.put(`/categories/${id}`, { name, description });
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.error || 'Failed to update');
    }
  }
);
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
      })
      
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.list = state.list.filter(cat => cat._id !== action.payload);
      })
      
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.list = state.list.map(cat =>
          cat._id === action.payload._id ? action.payload : cat
        );
      });
  }
});


export default categorySlice.reducer;
