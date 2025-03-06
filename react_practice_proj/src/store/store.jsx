import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productSlice';

export default configureStore({
  reducer: {
    products : productsReducer
  },
})