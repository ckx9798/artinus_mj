import { useEffect, useMemo, useState } from "react";

import type { Product } from "../../../shared/api/types";

type ChartData = { name: string; [key: string]: string | number };

export const useProductChartData = (product: Product) => {
  // --- 리뷰 평점 분포 데이터 ---
  const reviewDistributionData = useMemo<ChartData[]>(() => {
    const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    product.reviews.forEach((review) => {
      counts[review.rating] = (counts[review.rating] || 0) + 1;
    });
    return Object.entries(counts).map(([rating, count]) => ({
      name: `${rating}점`,
      "리뷰 수": count,
    }));
  }, [product.reviews]);

  // --- 가격 구성 비교 데이터 ---
  const priceComparisonData = useMemo<ChartData[]>(() => {
    const originalPrice =
      product.price / (1 - product.discountPercentage / 100);
    const discountAmount = originalPrice - product.price;
    return [
      {
        name: "가격 비교",
        정가: parseFloat(originalPrice.toFixed(2)),
        할인가: parseFloat(product.price.toFixed(2)),
        할인액: parseFloat(discountAmount.toFixed(2)),
      },
    ];
  }, [product.price, product.discountPercentage]);

  // --- 월별 할인율 변동 데이터 ---
  const [monthlyDiscountData, setMonthlyDiscountData] = useState<ChartData[]>(
    [],
  );

  useEffect(() => {
    const months = ["4월", "5월", "6월", "7월", "8월", "9월"];
    const generatedData = months.map((month) => {
      if (month === "9월") {
        return {
          name: month,
          "할인율(%)": product.discountPercentage,
        };
      }
      // --- 가상 할인율 적용 ---
      return {
        name: month,
        "할인율(%)": Math.floor(Math.random() * 20) + 5, // 5% ~ 24% 사이로 조정
      };
    });
    setMonthlyDiscountData(generatedData);
  }, [product.id, product.discountPercentage]); // product.id가 바뀔 때만 실행

  return {
    reviewDistributionData,
    priceComparisonData,
    monthlyDiscountData,
  };
};
