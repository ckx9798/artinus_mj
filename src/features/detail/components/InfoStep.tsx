import type { Product } from "../../../shared/api/types";

interface StepProps {
  product: Product;
}

const InfoStep = ({ product }: StepProps) => {
  const formatPrice = (price: number) => price.toLocaleString("en-US");

  return (
    <div className="space-y-12">
      {/* --- 상단 이미지 + 구매 버튼 --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8">
        <div className="overflow-hidden rounded-lg bg-white shadow-sm">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="flex flex-col bg-white p-6 shadow-sm lg:py-28">
          <p className="font-medium text-primary">{product.brand}</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            {product.title}
          </h1>
          <div className="mt-4 flex items-baseline gap-4">
            <p className="text-3xl font-bold tracking-tight text-neutral-900">
              ${formatPrice(product.price)}
            </p>
            <span className="rounded-full bg-secondary px-2 py-1 text-sm font-semibold text-secondary-900">
              {product.discountPercentage}% OFF
            </span>
          </div>
          <p className="mt-4 text-sm text-neutral-600">
            {product.shippingInformation}
          </p>
          <div className="mt-auto pt-8">
            <button className="w-full rounded-lg bg-primary py-3 text-lg font-semibold text-white shadow-sm transition-colors hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600">
              구매하기
            </button>
          </div>
        </div>
      </div>

      {/* --- 하단 상세설명 --- */}
      <div className="space-y-8">
        <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-neutral-800">상품 설명</h3>
          <p className="mt-4 text-base text-neutral-700">
            {product.description}
          </p>
        </div>
        <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-neutral-800">상세 사양</h3>
          <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-neutral-500">카테고리</p>
              <p className="font-medium text-neutral-800">{product.category}</p>
            </div>
            <div>
              <p className="text-sm text-neutral-500">재고 상태</p>
              <p className="font-medium text-green-600">
                {product.availabilityStatus} ({product.stock}개 남음)
              </p>
            </div>
            <div>
              <p className="text-sm text-neutral-500">무게</p>
              <p className="font-medium text-neutral-800">{product.weight}g</p>
            </div>
            <div>
              <p className="text-sm text-neutral-500">크기 (W/H/D)</p>
              <p className="font-medium text-neutral-800">
                {product.dimensions.width} / {product.dimensions.height} /{" "}
                {product.dimensions.depth} cm
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoStep;
