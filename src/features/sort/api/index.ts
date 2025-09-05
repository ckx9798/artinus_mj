import type { ProductListResponse } from "../../../shared/api/types";
import { axiosInstance } from "../../../shared/api";

export const getAllProducts = async (): Promise<ProductListResponse> => {
  const res = await axiosInstance.get<ProductListResponse>("/products?limit=0");
  return res.data;
};
