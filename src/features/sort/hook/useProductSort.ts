import { useMemo, useState } from "react";

import type { Product } from "../../../shared/api/types";
import { getAllProducts } from "../api";
import { useQuery } from "@tanstack/react-query";

// --- 정렬 옵션 ---
export type SortKey = "price" | "rating" | "default";
// --- 오름 / 내림차순 ---
export type SortOrder = "asc" | "desc";
export interface SortConfig {
  key: SortKey;
  order: SortOrder;
}

export const useProductSort = () => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "default",
    order: "asc",
  });
  const [selectedCategory, setSelectedCategory] = useState("all");

  // --- 데이터 페칭 ---
  const {
    data: productsData,
    status,
    error,
  } = useQuery({
    queryKey: ["products", "all"],
    queryFn: getAllProducts,
  });

  // --- 카테고리 추출 ---
  const categories = useMemo(() => {
    if (!productsData) return [];
    const uniqueCategories = new Set(
      productsData.products.map((p) => p.category),
    );
    return [...uniqueCategories];
  }, [productsData]);

  // --- 정렬 토글 ---
  const processedProducts = useMemo(() => {
    let products = productsData?.products ?? [];

    if (selectedCategory !== "all") {
      products = products.filter(
        (product) => product.category === selectedCategory,
      );
    }

    const { key, order } = sortConfig;
    if (key !== "default") {
      products = [...products].sort((a, b) => {
        const valA = a[key as keyof Product] as number;
        const valB = b[key as keyof Product] as number;
        if (valA < valB) return order === "asc" ? -1 : 1;
        if (valA > valB) return order === "asc" ? 1 : -1;
        return 0;
      });
    }

    return products;
  }, [productsData, selectedCategory, sortConfig]);

  // --- 정렬 변경 함수 ---
  const handleSort = (key: SortKey) => {
    setSortConfig((prev) => {
      if (prev.key === key)
        return { ...prev, order: prev.order === "asc" ? "desc" : "asc" };
      return { key, order: "desc" };
    });
  };

  return {
    status,
    error,
    categories,
    processedProducts,
    sortConfig,
    handleSort,
    selectedCategory,
    setSelectedCategory,
  };
};
