// src/context/ProductsContext.jsx
import React, { createContext } from "react";

const ProductsContext = createContext({
  products: [],
  onAddProduct: (product) => {},
  onDeleteProduct: (item) => {},
  existingPage: "",
  onPageChange: (page) => {}
});

export const ProductsProvider = ({ children }) => {
  // The actual implementation is in DashboardLayout
  // This is just a wrapper component
  return (
    <ProductsContext.Provider value={{}}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;