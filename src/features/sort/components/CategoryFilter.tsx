interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) => {
  const capitalize = (str: string): string => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
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
  );
};

export default CategoryFilter;
