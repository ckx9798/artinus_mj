import { useEffect, useState } from "react";

import { ClipLoader } from "react-spinners";
import { DETAIL_TABS } from "../features/detail/detail.config";
import MessageDisplay from "../shared/ui/MessageDisplay";
import StepTab from "../features/detail/components/StepTab";
import { getProductById } from "../features/detail/api";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useSwipeable } from "react-swipeable";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const {
    data: product,
    status,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id!),
  });

  useEffect(() => {
    if (status === "error" && error)
      toast.error(`데이터 로딩 중 오류: ${error.message}`);
  }, [status, error]);

  const ActiveStepComponent = DETAIL_TABS[currentStepIndex]?.component;

  const handleNext = () => {
    setCurrentStepIndex((prev) => Math.min(prev + 1, totalSteps - 1));
  };

  const handlePrev = () => {
    setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    trackMouse: true,
  });

  const totalSteps = DETAIL_TABS.length;

  if (status === "pending")
    return (
      <div className="flex h-screen items-center justify-center">
        <ClipLoader color="#0064FF" size={50} />
      </div>
    );

  if (status === "error" || !product)
    return (
      <MessageDisplay
        title="😔 상품을 찾을 수 없습니다"
        description="요청하신 상품이 존재하지 않거나, 오류가 발생했습니다."
      />
    );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* --- 상단 스텝 이동 탭 --- */}
      <StepTab
        currentStepIndex={currentStepIndex}
        setCurrentStepIndex={setCurrentStepIndex}
        totalSteps={totalSteps}
      />
      {/* --- 스와이프 핸들러 --- */}
      <div
        {...swipeHandlers}
        className="rounded-lg border border-neutral-200 bg-white p-2 shadow-sm"
      >
        {/* --- 현재 스탭 컴포넌트 --- */}
        {ActiveStepComponent && <ActiveStepComponent product={product} />}
      </div>
    </div>
  );
};

export default ProductDetailPage;
