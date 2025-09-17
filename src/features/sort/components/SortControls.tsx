import type { SortConfig, SortKey } from "../hook/useProductSort";

import CategoryFilter from "./CategoryFilter";
import SortButtons from "./SortButtons";

interface SortControlsProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortConfig: SortConfig;
  onSortChange: (key: SortKey) => void;
  productCount: number;
}

const SortControls = ({
  categories,
  selectedCategory,
  onCategoryChange,
  sortConfig,
  onSortChange,
  productCount,
}: SortControlsProps) => {
  return (
    <section aria-label="상품 필터 및 정렬 컨트롤">
      <div className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* --- 카테고리 필터링 영역 --- */}
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={onCategoryChange}
          />

          {/* --- 정렬 버튼 영역 --- */}
          <SortButtons sortConfig={sortConfig} onSortChange={onSortChange} />
        </div>
      </div>

      {/* --- 상품 갯수 --- */}
      <p className="mr-1 mt-2 text-right text-sm text-neutral-500 md:mt-4">
        총 {productCount}개의 상품
      </p>
    </section>
  );
};

export default SortControls;
