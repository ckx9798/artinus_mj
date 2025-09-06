import ChartStep from "./components/ChartStep";
import type { ComponentType } from "react";
import InfoStep from "./components/InfoStep";
import type { Product } from "../../shared/api/types";
import ReviewsStep from "./components/ReviewStep";

interface StepProps {
  product: Product;
}

export interface StepConfig {
  id: string;
  title: string;
  component: ComponentType<StepProps>;
}

// --- 스탭 정의 ---
const STEPS: Record<string, StepConfig> = {
  info: { id: "info", title: "종합 정보", component: InfoStep },
  reviews: { id: "reviews", title: "리뷰", component: ReviewsStep },
  chart: { id: "chart", title: "데이터", component: ChartStep },
};

// --- 탭 순서 ---
export const DETAIL_TABS: StepConfig[] = [
  STEPS.info,
  STEPS.reviews,
  STEPS.chart,
];
