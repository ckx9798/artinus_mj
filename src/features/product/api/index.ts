import type { ProductListResponse } from "../../../shared/api/types";
import { axiosInstance } from "../../../shared/api";

const PRODUCT_LIMIT = 20;

export const getProducts = async (
  pageParam: number = 0,
): Promise<ProductListResponse> => {
  const res = await axiosInstance.get<ProductListResponse>("/products", {
    params: {
      limit: PRODUCT_LIMIT,
      skip: pageParam,
    },
  });
  return res.data;
};
