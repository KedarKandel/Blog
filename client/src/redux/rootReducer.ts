import { combineReducers } from '@reduxjs/toolkit';
import blogReducer from './reducers/blogSlice';
import userReducer from './reducers/userSlice';

export const rootReducer = combineReducers({
  blog: blogReducer,
  user: userReducer
});


