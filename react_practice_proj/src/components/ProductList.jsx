import DeleteModel from "../models/DeleteModel";
import FilterProduct from "./FilterProduct";
import { useEffect, useState, useContext, useMemo } from "react";
import "./Products.css";
import ProductsContext from "../context/ProductsContext";
import { useLocation } from "react-router-dom";
import useHttp from "../custom-hooks/use-http";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../store/productSlice";

function ProductList() {
  // LEARNING EXAMPLE: Multiple state management approaches
  // Data flow priority:
  // 1. Context (for real-time updates)
  // 2. Redux Store (for persistent state)
  // 3. API (for initial data & synchronization)

  const useHttpHook = useHttp();
  const productsCtx = useContext(ProductsContext);
  const location = useLocation();
  const isProductPage = location.pathname.includes("list_products");
  const productListFromStore = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  // This stores the master list of products - this will remain as a learning example
  const [masterProducts, setMasterProducts] = useState([]);

  // Add loading state to improve UX
  const [isLoading, setIsLoading] = useState(true);

  // State for UI interactions
  const [filterState, setFilterState] = useState("All");
  const [showDelModel, setShowDelModel] = useState(false);
  const [delProduct, setDelProduct] = useState({});
  const [searchProductkey, setSearchProductKey] = useState("");
  const [fbProducts, setFbProducts] = useState([]);

  // IMPROVEMENT: Single function to handle data synchronization
  const syncProductsData = (newData) => {
    if (newData && Array.isArray(newData) && newData.length > 0) {
      console.log("Syncing product data:", newData.length, "products");
      setMasterProducts(newData);
      setIsLoading(false);
    }
  };

  // Sync with context products when they change
  useEffect(() => {
    console.log("Products context changed:", productsCtx.products?.length || 0);
    if (productsCtx.products && productsCtx.products.length > 0) {
      syncProductsData(productsCtx.products);
    }
  }, [productsCtx.products]);

  // IMPROVEMENT: Sync with Redux store when it changes
  useEffect(() => {
    console.log(
      "Redux store products changed:",
      productListFromStore?.length || 0
    );
    if (productListFromStore && productListFromStore.length > 0) {
      syncProductsData(productListFromStore);
    }
  }, [productListFromStore]);

  // Fetch products from API on initial load
  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true);
      console.log("Fetching products from API...");
      try {
        const response = await useHttpHook.fetchData("/products");
        if (response !== null) {
          const list = Object.entries(response).map(([key, value]) => ({
            ...value,
            id: key,
          }));
          setFbProducts(list);

          // IMPROVEMENT: Only update if we don't have products already
          // or if API has more up-to-date data
          if (masterProducts.length === 0) {
            syncProductsData(list);
          }
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      }
    };
    getProducts();
  }, []);

  // Filter products based on filterState - doesn't modify master list
  const filteredProducts = useMemo(() => {
    if (filterState === "All") {
      return masterProducts;
    } else if (filterState === "Available") {
      return masterProducts.filter((product) => product.isAvailable === true);
    } else if (filterState === "UnAvailable") {
      return masterProducts.filter((product) => product.isAvailable === false);
    }
    return masterProducts;
  }, [masterProducts, filterState]);

  // Further filter based on search - doesn't modify filtered list
  const displayProducts = useMemo(() => {
    if (searchProductkey?.length > 0) {
      return filteredProducts.filter((product) =>
        product.pName?.toLowerCase().includes(searchProductkey.toLowerCase())
      );
    }
    return filteredProducts;
  }, [searchProductkey, filteredProducts]);

  const onFilterSelected = (selected) => {
    setFilterState(selected);
  };

  const onDelete = (product) => {
    setShowDelModel(true);
    setDelProduct(product);
  };

  const hideModel = () => {
    setShowDelModel(false);
  };

  const onDeleteProduct = async () => {
    try {
      // IMPROVEMENT: Optimistic UI update - update local state immediately
      setMasterProducts((prevProducts) => {
        return prevProducts.filter((product) => {
          if (delProduct.id) {
            return product.id !== delProduct.id;
          }
          if (delProduct.pId) {
            return product.pId !== delProduct.pId;
          }
          return true; // Keep product if we can't determine the ID
        });
      });

      // Delete from backend
      await useHttpHook.deleteData(`/products`, delProduct.id);

      // Update context
      productsCtx.onDeleteProduct(delProduct);

      // Update Redux store if needed
      if (delProduct.id) {
        dispatch(deleteProduct(delProduct.id));
      } else if (delProduct.pId) {
        dispatch(deleteProduct(delProduct.pId));
      }

      // Reset delete modal
      setShowDelModel(false);
      setDelProduct({});
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const searchProduct = (eve) => {
    setSearchProductKey(eve.target.value);
  };

  // Only render when on products page
  if (!isProductPage) {
    return null;
  }

  return (
    <>
      <div className="d-flex align-items-center justify-content-center mt-3">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <h1>Product List</h1>

            <div className="d-flex align-items-center justify-content-center">
              <FilterProduct
                disable={masterProducts.length === 0}
                onFilterSelected={onFilterSelected}
              />
              <div className="container">
                <div className="row">
                  <div className="col-md-12 mx-auto">
                    <input
                      type="search"
                      className="form-control"
                      placeholder="Search..."
                      aria-label="Search"
                      disabled={masterProducts.length === 0}
                      onInput={searchProduct}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ul className="list-group">
            <li className="list-group-item mb-1" key="header">
              <div className="row">
                <div className="col-3">
                  <div className="fw-bold">Product Name</div>
                </div>
                <div className="col-3">
                  <div className="fw-bold">Description</div>
                </div>
                <div className="col-2">
                  <div className="fw-bold">Price</div>
                </div>
                <div className="col-2">
                  <div className="fw-bold">Status</div>
                </div>
                <div className="col-1">
                  <div className="fw-bold">Action</div>
                </div>
              </div>
            </li>

            {/* IMPROVEMENT: Added proper loading state */}
            {isLoading && (
              <li className="list-group-item">Loading products...</li>
            )}

            {!isLoading && displayProducts.length === 0 && (
              <li className="list-group-item">No products found</li>
            )}

            {!isLoading &&
              displayProducts.length > 0 &&
              displayProducts.map((product) => (
                <li
                  className="list-group-item"
                  key={product.id || product.pId || Math.random()}
                  style={{
                    backgroundColor:
                      !product.isAvailable && filterState === "All"
                        ? "#dedede"
                        : "#FFF",
                  }}
                >
                  <div className="row">
                    <div className="col-3">
                      <div className="fw-bold">{product.pName}</div>
                    </div>
                    <div className="col-3">
                      <div>{product.pDesc}</div>
                    </div>
                    <div className="col-2">${product.pPrice}</div>
                    <div className="col-2">
                      <span
                        className={
                          product.isAvailable
                            ? "badge bg-success rounded-pill"
                            : " badge bg-danger rounded-pill"
                        }
                      >
                        {product.isAvailable ? "Available" : "Not Available"}
                      </span>
                    </div>
                    <div
                      className="col-1 d-flex justify-content-center align-items-start "
                      style={{ color: "#ee0c0cbd" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-trash"
                        viewBox="0 0 16 16"
                        style={{ cursor: "pointer" }}
                        onClick={() => onDelete(product)}
                      >
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                      </svg>{" "}
                    </div>
                  </div>
                </li>
              ))}
          </ul>
          <DeleteModel
            show={showDelModel}
            product={delProduct}
            hideModel={hideModel}
            onDeleteProduct={onDeleteProduct}
          />
        </div>
      </div>
    </>
  );
}

export default ProductList;
