import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  isLoading: false,
  error: null
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Set loading state
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    
    // Set error state
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    
    // Set all products (after fetching)
    setProducts: (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    
    // Add a single product
    addProduct: (state, action) => {
      state.products.push(action.payload);
      state.isLoading = false;
    },
    
    // Update a product
    updateProduct: (state, action) => {
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
      state.isLoading = false;
    },
    
    // Delete a product
    deleteProduct: (state, action) => {
      state.products = state.products.filter(p => p.id !== action.payload);
      state.isLoading = false;
    },
    
    // Reset the state
    resetProductState: (state) => {
      return initialState;
    }
  }
});

export const { 
  setLoading, 
  setError, 
  setProducts, 
  addProduct, 
  updateProduct, 
  deleteProduct,
  resetProductState
} = productSlice.actions;

export default productSlice.reducer;