import { useState, useCallback, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ProductHeader from "../components/ProductHeader";
import ProductsContext from "../context/ProductsContext";

const ProductsDashboard = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  // Determine the active page based on the current path
  const getActivePage = () => {
    const path = location.pathname.split("/").pop();
    if (path === "add_products") return "Add Product";
    if (path === "list_products") return "Products";
    if (path === "contact_details") return "ContactDetails";
    return "Add Product"; // Default
  };

  const [activePage, setActivePage] = useState(getActivePage());

  // Update activePage when location changes
  useEffect(() => {
    setActivePage(getActivePage());
  }, [location.pathname]);

  // Handle adding new product
  const handleNewProduct = useCallback(
    (productInfo) => {
      setProducts((prev) => [
        ...prev,
        {
          ...productInfo,
          id: productInfo.id || productInfo.pId || Date.now().toString(),
        },
      ]);
      // Navigate to products list after adding
      navigate("/dashboard/list_products");
      setActivePage("Products");
    },
    [navigate]
  );

  // Handle deleting product
  const handleDeleteProduct = useCallback((item) => {
    console.log("Deleting product in dashboard:", item);
    setProducts((prev) => {
      // Use more specific ID matching for deletion
      const filteredProducts = prev.filter((product) => {
        // Check for exact match with either ID type
        if (item.id && product.id) {
          return product.id !== item.id;
        }
        if (item.pId && product.pId) {
          return product.pId !== item.pId;
        }
        return true; // Keep product if we can't determine a match
      });

      console.log("Products after deletion:", filteredProducts);
      return filteredProducts;
    });
  }, []);

  // Handle page change from header
  const handlePageChange = useCallback(
    (newPage) => {
      setActivePage(newPage);

      // Navigate based on the page name
      if (newPage === "Add Product") navigate("/dashboard/add_products");
      else if (newPage === "Products") navigate("/dashboard/list_products");
      else if (newPage === "ContactDetails")
        navigate("/dashboard/contact_details");
    },
    [navigate]
  );

  return (
    <ProductsContext.Provider
      value={{
        products,
        onAddProduct: handleNewProduct,
        onDeleteProduct: handleDeleteProduct,
        existingPage: activePage,
        onPageChange: handlePageChange,
      }}
    >
      <div className="container">
        <div className="products-header">
          <ProductHeader
            existingPage={activePage}
            onPageChange={handlePageChange}
          />
        </div>
        <Outlet />
      </div>
    </ProductsContext.Provider>
  );
};

export default ProductsDashboard;
