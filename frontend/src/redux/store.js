import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import postReducer from './postsSlice';
import commentReducer from './commentSlice';
import categoryReducer from './categorySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    comments: commentReducer,
    categories: categoryReducer,
  },
});
