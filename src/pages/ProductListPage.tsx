import { useEffect, useMemo, useState } from "react";

import { ClipLoader } from "react-spinners";
import MessageDisplay from "../shared/ui/MessageDisplay";
import ProductList from "../features/product/components/ProductList";
import SearchInput from "../shared/ui/SearchInput";
import Spinner from "../shared/ui/Spinner";
import { getProducts } from "../features/product/api";
import { toast } from "react-toastify";
import { useDebounce } from "../shared/hooks/useDebouce";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInfiniteScroll } from "../shared/hooks/useInfiniteScroll";

const ProductListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // --- 데이터 페칭 ---
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["products", debouncedSearchTerm],
    queryFn: ({ pageParam }) =>
      getProducts({ pageParam, query: debouncedSearchTerm }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const products = lastPage.products || [];
      if (lastPage.skip + products.length >= lastPage.total) return undefined;
      return lastPage.skip + products.length;
    },
  });

  const allProducts = useMemo(
    () => data?.pages.flatMap((page) => page.products) ?? [],
    [data],
  );

  // --- 옵저버 ---
  const { observerTargetRef } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  useEffect(() => {
    if (status === "error")
      toast.error(`데이터 로딩 중 오류: ${error.message}`);
  }, [status, error]);

  if (status === "pending" && !isFetchingNextPage) {
    return (
      <div className="flex h-screen items-center justify-center">
        <ClipLoader color="#0064FF" size={50} />
      </div>
    );
  }

  if (status === "error" && !allProducts.length) {
    return (
      <MessageDisplay
        title="오류가 발생했습니다 ❎"
        description="데이터를 불러오는 데 실패했습니다. 잠시 후 다시 시도해주세요."
      />
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
      {/* --- 검색 Input --- */}
      <div className="mb-4">
        <SearchInput
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* --- 데이터 렌더링 --- */}
      {allProducts.length > 0 ? (
        <ProductList
          products={allProducts}
          observerTargetRef={observerTargetRef}
        />
      ) : (
        <MessageDisplay
          title="😔 검색 결과가 없습니다"
          description="🔍 다른 키워드로 검색해보세요"
        />
      )}

      {isFetchingNextPage && <Spinner />}
    </div>
  );
};

export default ProductListPage;
