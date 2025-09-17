import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import ChartCard from "./ChartCard";
import type { Product } from "../../../shared/api/types";
import { useProductChartData } from "../hooks/useProductChartData";

const DATA_KEYS = {
  REVIEW_COUNT: "리뷰 수",
  ORIGINAL_PRICE: "정가",
  DISCOUNT_PRICE: "할인가",
  DISCOUNT_AMOUNT: "할인액",
  DISCOUNT_RATE: "할인율(%)",
};

interface StepProps {
  product: Product;
}

const ChartStep = ({ product }: StepProps) => {
  // --- 데이터 로직 훅 호출 ---
  const { reviewDistributionData, priceComparisonData, monthlyDiscountData } =
    useProductChartData(product);

  return (
    <div className="mx-auto max-w-2xl space-y-4 lg:my-8 lg:space-y-12">
      <ChartCard title="리뷰 평점 분포">
        <BarChart
          data={reviewDistributionData}
          margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip cursor={{ fill: "rgba(226, 232, 240, 0.5)" }} />
          <Legend />
          <Bar dataKey={DATA_KEYS.REVIEW_COUNT} fill="#8884d8" />
        </BarChart>
      </ChartCard>

      <ChartCard title="가격 구성 비교">
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
          <Bar dataKey={DATA_KEYS.ORIGINAL_PRICE} fill="#CBD5E1" />
          <Bar dataKey={DATA_KEYS.DISCOUNT_PRICE} fill="#0064FF" />
          <Bar dataKey={DATA_KEYS.DISCOUNT_AMOUNT} fill="#A3FF6B" />
        </BarChart>
      </ChartCard>

      <ChartCard title="월별 할인율 변동 추이 (가상)">
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
            dataKey={DATA_KEYS.DISCOUNT_RATE}
            stroke="#0064FF"
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ChartCard>
    </div>
  );
};

export default ChartStep;
