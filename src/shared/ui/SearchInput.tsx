interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const SearchInput = ({ value, onChange, placeholder }: SearchInputProps) => {
  return (
    <input
      type="text"
      placeholder={placeholder || "🔍  상품 검색..."}
      value={value}
      onChange={onChange}
      className="w-full rounded-md border border-neutral-300 bg-neutral-100 px-4 py-3 text-sm focus:border-primary focus:ring-primary md:max-w-xs"
    />
  );
};

export default SearchInput;
