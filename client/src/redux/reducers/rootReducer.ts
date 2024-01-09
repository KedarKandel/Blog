import { combineReducers } from '@reduxjs/toolkit';
import blogReducer from './blogReducer';

export const rootReducer = combineReducers({
  blog: blogReducer,
});


