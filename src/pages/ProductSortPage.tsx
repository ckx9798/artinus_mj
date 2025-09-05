import { ClipLoader } from "react-spinners";
import MessageDisplay from "../shared/ui/MessageDisplay";
import type { Product } from "../shared/api/types";
import ProductCard from "../features/product/components/ProductCard";
import SortControls from "../features/sort/components/SortControls";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useProductSort } from "../features/sort/hook/useProductSort";

const ProductSortPage = () => {
  const {
    status,
    error,
    categories,
    processedProducts,
    sortConfig,
    handleSort,
    selectedCategory,
    setSelectedCategory,
  } = useProductSort();

  useEffect(() => {
    if (status === "error" && error) {
      toast.error(`상품 데이터 로딩 중 오류: ${error.message}`);
    }
  }, [status, error]);

  if (status === "pending") {
    return (
      <div className="flex h-screen items-center justify-center">
        <ClipLoader color="#0064FF" size={50} />
      </div>
    );
  }
  if (status === "error") {
    return (
      <MessageDisplay
        title="😔 오류가 발생했습니다"
        description="데이터를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요."
      />
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
      {/* --- 상품 정렬 컴포넌트 --- */}
      <SortControls
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortConfig={sortConfig}
        onSortChange={handleSort}
        productCount={processedProducts.length}
      />

      {/* --- 데이터 렌더링 --- */}
      <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {processedProducts.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* --- 데이터 없을 때 예외처리 --- */}
      {processedProducts.length === 0 && (
        <MessageDisplay
          title="😔 검색 결과가 없습니다"
          description="다른 필터나 정렬을 시도해보세요."
        />
      )}
    </div>
  );
};

export default ProductSortPage;
