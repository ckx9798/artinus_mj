import type { SortConfig, SortKey } from "../hook/useProductSort";

// --- 정렬 옵션 ---
const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "price", label: "가격" },
  { key: "rating", label: "평점" },
];

interface SortButtonsProps {
  sortConfig: SortConfig;
  onSortChange: (key: SortKey) => void;
}

const SortButtons = ({ sortConfig, onSortChange }: SortButtonsProps) => {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-sm font-medium text-neutral-600">정렬:</span>
      <div className="flex gap-2">
        {SORT_OPTIONS.map((option) => (
          <button
            key={option.key}
            onClick={() => onSortChange(option.key)}
            className={`flex w-20 items-center justify-center gap-1.5 rounded-lg px-3 py-1 text-sm transition-colors ${
              sortConfig.key === option.key
                ? "bg-primary text-white"
                : "bg-neutral-200 text-neutral-700 hover:bg-neutral-300"
            }`}
            aria-label={`${option.label}`}
          >
            {option.label}
            {sortConfig.key === option.key && (
              <span className="text-xs" aria-hidden="true">
                {sortConfig.order === "asc" ? "▲" : "▼"}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SortButtons;
