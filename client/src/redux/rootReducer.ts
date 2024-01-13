import { combineReducers } from '@reduxjs/toolkit';
import blogReducer from './reducers/blogReducer';

export const rootReducer = combineReducers({
  blog: blogReducer,
});


