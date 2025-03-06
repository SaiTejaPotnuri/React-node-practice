// src/routes/AppRoutes.jsx
import React, { Suspense, lazy } from "react";
import { createBrowserRouter, createRoutesFromElements, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import RootLayout from "./RootLayout";

// Lazy load components instead of direct imports
const Forms = lazy(() => import("../components/Forms"));
const CreateProduct = lazy(() => import("../components/CreateProduct"));
const ProductList = lazy(() => import("../components/ProductList"));
const ProductsDashboard = lazy(() => import("../components/ProductsDashboard"));
const ContactDetials = lazy(() => import("../components/ContactDetials"));

// Loading fallback component
const LoadingFallback = () => <div className="p-4">Loading...</div>;

const AppRouting = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route
        index
        element={
          <Suspense fallback={<LoadingFallback />}>
            <Forms />
          </Suspense>
        }
      />
      <Route
        path="dashboard"
        element={
          <ProtectedRoute>
            <Suspense fallback={<LoadingFallback />}>
              <ProductsDashboard />
            </Suspense>
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="add_products" replace />} />
        <Route
          path="add_products"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <CreateProduct />
            </Suspense>
          }
        />
        <Route
          path="list_products"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <ProductList />
            </Suspense>
          }
        />
        <Route
          path="contact_details"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <ContactDetials />
            </Suspense>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  )
);

export default AppRouting;