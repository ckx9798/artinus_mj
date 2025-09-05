import type { Product } from "../../../shared/api/types";
import ProductCard from "./ProductCard";
import React from "react";

const PREFETCH_THRESHOLD = 5;

interface ProductListProps {
  products: Product[];
  observerTargetRef: React.Ref<HTMLDivElement>;
}

const ProductList = ({ products, observerTargetRef }: ProductListProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product, index) => {
        const isPrefetchTarget = products.length - PREFETCH_THRESHOLD === index;
        return (
          <div
            key={product.id}
            ref={isPrefetchTarget ? observerTargetRef : null}
          >
            <ProductCard product={product} />
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
