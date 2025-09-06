import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { Product } from "../../../shared/api/types";
import { useMemo } from "react";

interface StepProps {
  product: Product;
}

const ChartStep = ({ product }: StepProps) => {
  // --- 리뷰 차트 데이터 ---
  const reviewDistributionData = useMemo(() => {
    const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    product.reviews.forEach((review) => {
      counts[review.rating] = (counts[review.rating] || 0) + 1;
    });
    return Object.entries(counts).map(([rating, count]) => ({
      name: `${rating}점`,
      "리뷰 수": count,
    }));
  }, [product.reviews]);

  // --- 정가 비교 함수 ---
  const priceComparisonData = useMemo(() => {
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

  // --- 랜덤의 월별 가상 할인율 ---
  const monthlyDiscountData = useMemo(() => {
    const months = ["4월", "5월", "6월", "7월", "8월", "9월"];
    return months.map((month) => {
      if (month === "9월") {
        return {
          name: month,
          "할인율(%)": product.discountPercentage,
        };
      }
      return {
        name: month,
        "할인율(%)": Math.floor(Math.random() * 20) + 1,
      };
    });
  }, [product.discountPercentage]);

  return (
    <div className="mx-auto max-w-2xl space-y-4 lg:my-8 lg:space-y-12">
      {/* --- 리뷰 차트 --- */}
      <div className="rounded-lg border border-neutral-200 bg-white p-2 shadow-sm">
        <h3 className="text-base font-semibold text-neutral-800 md:text-lg">
          리뷰 평점 분포
        </h3>
        <div className="mt-6 h-80 w-full md:h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={reviewDistributionData}
              margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip cursor={{ fill: "rgba(226, 232, 240, 0.5)" }} />
              <Legend />
              <Bar dataKey="리뷰 수" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* --- 가격 비교 차트 --- */}
      <div className="rounded-lg border border-neutral-200 bg-white p-2 shadow-sm md:p-6">
        <h3 className="text-base font-semibold text-neutral-800 md:text-lg">
          가격 구성 비교
        </h3>
        <div className="mt-6 h-80 w-full md:h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={priceComparisonData}
              margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value: number) => `$${value.toFixed(2)}`}
                cursor={{ fill: "rgba(226, 232, 240, 0.5)" }}
              />
              <Legend />
              <Bar dataKey="정가" fill="#CBD5E1" />
              <Bar dataKey="할인가" fill="#0064FF" />
              <Bar dataKey="할인액" fill="#A3FF6B" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* --- 할인율 차트 --- */}
      <div className="rounded-lg border border-neutral-200 bg-white p-2 shadow-sm md:p-6">
        <h3 className="text-base font-semibold text-neutral-800 md:text-lg">
          월별 할인율 변동 추이 (가상)
        </h3>
        <div className="mt-6 h-80 w-full md:h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={monthlyDiscountData}
              margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, "dataMax + 5"]} />
              <Tooltip formatter={(value: number) => `${value.toFixed(2)}%`} />
              <Legend />
              <Line
                type="monotone"
                dataKey="할인율(%)"
                stroke="#0064FF"
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ChartStep;
