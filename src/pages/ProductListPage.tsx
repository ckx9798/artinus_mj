import { useEffect, useRef } from "react";

import { ClipLoader } from "react-spinners";
import { getProducts } from "../features/product/api";
import { toast } from "react-toastify";
import { useInfiniteQuery } from "@tanstack/react-query";

const ProductListPage = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: ({ pageParam }) => getProducts(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const { products, total, skip } = lastPage;
      if (skip + products.length >= total) {
        return undefined;
      }
      return skip + products.length;
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
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    if (status === "error") {
      toast.error(`데이터를 불러오는 중 오류가 발생했습니다: ${error.message}`);
    }
  }, [status, error]);

  const formatPrice = (price: number) => {
    return price.toLocaleString("en-US");
  };

  if (status === "pending") {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <ClipLoader color="#0064FF" size={50} />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-neutral-700">오류가 발생했습니다.</p>
          <p className="text-neutral-500">잠시 후 다시 시도해주세요.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="sticky top-0 border-b border-neutral-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-primary">Artinus Market</h1>
        </div>
      </header>

      <main>
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.pages
              .flatMap((page) => page.products)
              .map((product) => (
                <div
                  key={product.id}
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
              ))}
          </div>

          <div ref={observerTargetRef} className="h-10" />

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
