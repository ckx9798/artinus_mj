import type { SortConfig, SortKey } from "../hook/useProductSort";

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
  const capitalize = (str: string) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* --- 상단 카테고리 영역 --- */}
        <div className="flex items-center gap-2">
          <label
            htmlFor="category-select"
            className="flex-shrink-0 text-sm font-medium text-neutral-600"
          >
            카테고리:
          </label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full rounded-lg border-neutral-300 bg-neutral-200 py-1 pl-1.5 shadow-sm focus:border-primary focus:ring-primary sm:w-auto sm:text-sm"
          >
            <option value="all">전체</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {capitalize(category)}
              </option>
            ))}
          </select>
        </div>

        {/* --- 정렬 버튼 --- */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-neutral-600">정렬:</span>
          {(["price", "rating"] as SortKey[]).map((key) => (
            <button
              key={key}
              onClick={() => onSortChange(key)}
              className={`flex w-16 items-center justify-center gap-1.5 rounded-lg px-3 py-1 text-sm transition-colors ${
                sortConfig.key === key
                  ? "bg-primary text-white"
                  : "bg-neutral-200 text-neutral-700 hover:bg-neutral-300"
              }`}
            >
              {key === "price" && "가격"}
              {key === "rating" && "평점"}
              {sortConfig.key === key && (
                <span className="text-xs">
                  {sortConfig.order === "asc" ? "▲" : "▼"}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* --- 상품 갯수 --- */}
      <p className="mt-4 text-right text-sm text-neutral-500">
        총 {productCount}개의 상품
      </p>
    </div>
  );
};

export default SortControls;
