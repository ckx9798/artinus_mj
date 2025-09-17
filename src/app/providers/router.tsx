import { Route, Routes } from "react-router-dom";

import Layout from "../../shared/ui/Layout";
import { lazy } from "react";

const ProductListPage = lazy(() => import("../../pages/ProductListPage"));
const ProductSortPage = lazy(() => import("../../pages/ProductSortPage"));
const ProductDetailPage = lazy(() => import("../../pages/ProductDetailPage"));

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<ProductListPage />} />
        <Route path="/sort" element={<ProductSortPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
      </Route>
    </Routes>
  );
};
