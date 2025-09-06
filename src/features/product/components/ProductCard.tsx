import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import type { Product } from "../../../shared/api/types";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const formatPrice = (price: number) => price.toLocaleString("en-US");

  return (
    <Link
      to={`/product/${product.id}`}
      className="group flex flex-col rounded-lg border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg"
    >
      {/* --- 제품 상단 이미지 --- */}
      <div className="relative flex justify-center overflow-hidden rounded-t-lg">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-[240px] w-auto object-contain p-4 transition-transform group-hover:scale-105"
        />
        <div className="absolute right-3 top-3 rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-900">
          {product.discountPercentage}% OFF
        </div>
      </div>

      {/* --- 제품 하단 설명 --- */}
      <div className="flex flex-1 flex-col p-4">
        <p className="mb-1 text-sm text-neutral-500">
          {product.brand || "etc"}
        </p>
        <h3 className="truncate font-bold text-neutral-800">{product.title}</h3>
        <div className="mt-auto flex items-center justify-between pt-2">
          <p className="text-lg font-bold text-primary">
            ${formatPrice(product.price)}
          </p>
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <FaStar className="text-secondary" />
            <span>{product.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
