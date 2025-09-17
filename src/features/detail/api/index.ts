import type { Product } from "../../../shared/api/types";
import { axiosInstance } from "../../../shared/api";

export const getProductById = async (id: string): Promise<Product> => {
  const res = await axiosInstance.get<Product>(`/products/${id}`);
  return res.data;
};
