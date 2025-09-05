import type { Product, ProductListResponse } from "../../../shared/api/types";

import { axiosInstance } from "../../../shared/api";

const PRODUCT_LIMIT = 20;

export const getProducts = async ({
  pageParam = 0,
  query = "",
}: {
  pageParam?: number;
  query?: string;
}): Promise<ProductListResponse> => {
  const endpoint = query ? `/products/search` : "/products";

  const params: { limit: number; skip: number; q?: string } = {
    limit: PRODUCT_LIMIT,
    skip: pageParam,
  };
  if (query) {
    params.q = query;
  }
  const res = await axiosInstance.get<ProductListResponse>(endpoint, {
    params,
  });

  return res.data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const res = await axiosInstance.get<Product>(`/products/${id}`);
  return res.data;
};
