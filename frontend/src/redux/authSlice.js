import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../services/api';

const userFromStorage = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null;

export const loginUser = createAsyncThunk('auth/loginUser', async (formData, thunkAPI) => {
  try {
    const res = await API.post('/auth/login', formData);
    const payload = {
      token: res.data.token,
      user: res.data.user 
    };
    localStorage.setItem('user', JSON.stringify(payload));
    return payload;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

export const registerUser = createAsyncThunk('auth/registerUser', async (formData, thunkAPI) => {
  try {
    const res = await API.post('/auth/register', formData);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  localStorage.removeItem('user');
});

const authSlice = createSlice({
  name: 'auth',
  
  initialState: {
    user: userFromStorage?.user || null,
    token: userFromStorage?.token || null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;
