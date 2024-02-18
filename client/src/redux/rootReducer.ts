import { combineReducers } from '@reduxjs/toolkit';
import blogReducer from './reducers/blogSlice';
import userReducer from './reducers/userSlice';
import toastReducer from './reducers/toastSlice';

export const rootReducer = combineReducers({
  blog: blogReducer,
  user: userReducer,
  toast: toastReducer
});


