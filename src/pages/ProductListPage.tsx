import { useEffect, useRef, useState } from "react";

import { ClipLoader } from "react-spinners";
import type { Product } from "../shared/api/types";
import { getProducts } from "../features/product/api";
import { toast } from "react-toastify";
import { useDebounce } from "../shared/hooks/useDebouce";
import { useInfiniteQuery } from "@tanstack/react-query";

const PREFETCH_THRESHOLD = 5;

const ProductListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

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
      if (lastPage.skip + products.length >= lastPage.total) {
        return undefined;
      }
      return lastPage.skip + products.length;
    },
  });

  const observerTargetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );
    const currentTarget = observerTargetRef.current;
    if (currentTarget) observer.observe(currentTarget);
    return () => {
      if (currentTarget) observer.unobserve(currentTarget);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, data]);

  useEffect(() => {
    if (status === "error")
      toast.error(`데이터 로딩 중 오류: ${error.message}`);
  }, [status, error]);

  const allProducts = data?.pages.flatMap((page) => page.products) ?? [];
  const formatPrice = (price: number) => price.toLocaleString("en-US");

  if (status === "pending" && !isFetchingNextPage) {
    return (
      <div className="flex h-screen items-center justify-center">
        <ClipLoader color="#0064FF" size={50} />
      </div>
    );
  }
  if (status === "error" && !allProducts.length) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>오류가 발생했습니다.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="sticky top-0 z-10 border-b border-neutral-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h1 className="text-2xl font-bold text-primary">Artinus Market</h1>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="상품 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-48 rounded-md border-neutral-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {allProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {allProducts.map((product: Product, index: number) => {
                const isPrefetchTarget =
                  allProducts.length - PREFETCH_THRESHOLD === index;
                return (
                  <div
                    key={`${product.id}-${debouncedSearchTerm}-${index}`}
                    ref={isPrefetchTarget ? observerTargetRef : null}
                    className="group cursor-pointer rounded-lg border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute right-3 top-3 rounded-full bg-secondary px-2 py-1 text-xs font-semibold text-secondary-900">
                        {product.discountPercentage}% OFF
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="mb-1 text-sm text-neutral-500">
                        {product.brand}
                      </p>
                      <h3 className="truncate font-semibold text-neutral-800">
                        {product.title}
                      </h3>
                      <div className="mt-2 flex items-end justify-between">
                        <p className="text-lg font-bold text-primary">
                          ${formatPrice(product.price)}
                        </p>
                        <div className="flex items-center gap-1 text-sm text-neutral-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-5 w-5 text-yellow-400"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.868 2.884c.321-.772 1.305-.772 1.626 0l1.838 4.435a1 1 0 00.95.69h4.624c.833 0 1.18.981.564 1.55l-3.743 2.722a1 1 0 00-.364 1.118l1.838 4.435c.321.772-.633 1.5-1.259.98l-3.743-2.722a1 1 0 00-1.175 0l-3.743 2.722c-.627.52-1.58-.208-1.259-.98l1.838-4.435a1 1 0 00-.364-1.118L2.05 9.559c-.616-.569-.269-1.55.564-1.55h4.624a1 1 0 00.95-.69l1.838-4.435z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>{product.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-center">
              <p className="text-lg text-neutral-500">검색 결과가 없습니다.</p>
            </div>
          )}
          {isFetchingNextPage && (
            <div className="flex justify-center py-4">
              <ClipLoader color="#0064FF" size={30} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProductListPage;
