import "./ProductHeaderStyle.css";
import { useState, useContext, useEffect, useCallback } from "react";
import Authenticate from "../context/AuthContext";
import React from "react";
import { Link, NavLink } from "react-router-dom";

const ProductHeader = (props) => {
  const [activePage, setActivePage] = useState("");

  let providerContext = useContext(Authenticate);

    {/**Here we make use of useCallback , it will not re-render when the component re-renders 
    * When the parent having any state changes as react it re-renders all the child components
    * But when we use useCallback it looks for if any change in value & method then only it weill re-render */}
  const navChanged = useCallback((activePage) => {
    setActivePage(activePage);
    props.onPageChange(activePage);
  }, [props.onPageChange]);

  useEffect(() => {
    setActivePage(props.existingPage);
  },[props.existingPage])
  
  const signOut = useCallback(() => {
    providerContext.logoutHandler();
  }, [providerContext]);

  return (
    <>
      <nav className="navbar bg-dark py-3" data-bs-theme="dark">
        <div className="container flex justify-content-between">
          <ul className="navbar-nav flex-row gap-4">
            <li className="nav-item">
              <NavLink
                to="/dashboard/add_products"
                className={`nav-link ${
                  activePage === "Add Product"
                    ? "active fw-bold text-blue"
                    : "text-white"
                }`}
                onClick={() => navChanged("Add Product")}
                style={{ cursor: "pointer" }}
              >
                Add Product
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/dashboard/list_products"
                className={`nav-link ${
                  activePage === "Products"
                    ? "active fw-bold text-blue"
                    : "text-white "
                }`}
                onClick={() => navChanged("Products")}
                style={{ cursor: "pointer" }}
              >
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/dashboard/contact_details"
                className={`nav-link ${
                  activePage === "ContactDetails"
                    ? "active fw-bold text-blue"
                    : "text-white"
                }`}
                onClick={() => navChanged("ContactDetails")}
                style={{ cursor: "pointer" }}
              >
                Contact
              </NavLink>
            </li>
          </ul>
          <div className="signOut">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              className="bi bi-box-arrow-right"
              viewBox="0 0 16 16"
              style={{ cursor: "pointer" }}
              onClick={signOut}
            >
              <path
                fill="white"
                d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
              />
              <path
                fill="white"
                d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
              />
            </svg>{" "}
          </div>
        </div>
      </nav>
    </>
  );
};

{/**If you see we use React.memo here we are making use of memoization , it will only re-render when the props changes and not when the component re-renders
  *When parent having any state changes as react it re-renders all the child components
  *But when we use React.memo it looks for if any change in prop then only it weill re-render 
  *React use Real Dom and Virtual Dom to compare the changes */}
export default React.memo(ProductHeader);
