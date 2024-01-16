import { combineReducers } from '@reduxjs/toolkit';
import blogReducer from './reducers/blogSlice';

export const rootReducer = combineReducers({
  blog: blogReducer,
});


