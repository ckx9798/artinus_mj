/** @format */

import { Route, Routes } from "react-router-dom";

import Layout from "../../shared/ui/Layout";
import ProductDetailPage from "../../pages/ProductDetailPage";
import ProductListPage from "../../pages/ProductListPage";
import ProductSortPage from "../../pages/ProductSortPage";

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
