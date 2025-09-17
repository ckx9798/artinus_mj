import type { Dispatch, SetStateAction } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

import { DETAIL_TABS } from "../detail.config";

interface StepTabProps {
  currentStepIndex: number;
  setCurrentStepIndex: Dispatch<SetStateAction<number>>;
  totalSteps: number;
}

const StepTab = ({
  currentStepIndex,
  setCurrentStepIndex,
  totalSteps,
}: StepTabProps) => {
  const handleTabClick = (index: number) => {
    setCurrentStepIndex(index);
  };

  const handlePrev = () => {
    setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentStepIndex((prev) => Math.min(prev + 1, totalSteps - 1));
  };

  const canGoPrev = currentStepIndex > 0;
  const canGoNext = currentStepIndex < totalSteps - 1;

  return (
    <div className="mb-8">
      <div className="mb-4 overflow-hidden rounded-full bg-neutral-200">
        {/* --- 프로그래스 바 --- */}
        <div
          className="h-2 rounded-full bg-primary transition-all duration-500"
          style={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }}
        />
      </div>

      {/* --- 데스크톱 탭 UI --- */}
      <div className="hidden justify-between sm:flex">
        {DETAIL_TABS.map((tab, index) => {
          const isCurrent = index === currentStepIndex;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(index)}
              className={`flex w-1/3 items-center justify-center gap-6 rounded-md p-2 transition-colors ${
                !isCurrent ? "cursor-pointer hover:bg-neutral-200" : ""
              }`}
              role="tab"
              aria-selected={isCurrent}
              aria-controls={`tabpanel-${tab.id}`}
              disabled={isCurrent}
            >
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                  isCurrent
                    ? "bg-primary text-white"
                    : "bg-neutral-200 text-neutral-500"
                }`}
              >
                {index + 1}
              </div>
              <div
                className={`font-medium transition-colors ${isCurrent ? "text-primary" : "text-neutral-500"}`}
              >
                {tab.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* --- 모바일 탭 --- */}
      <div className="flex w-full items-center justify-center gap-12 text-sm font-semibold sm:hidden">
        <button
          onClick={handlePrev}
          disabled={!canGoPrev}
          aria-label="이전 단계"
        >
          <FaArrowAltCircleLeft
            className={`transition-colors ${canGoPrev ? "text-neutral-500" : "text-neutral-300"}`}
          />
        </button>
        <span className="flex flex-col items-center text-neutral-500">
          {DETAIL_TABS[currentStepIndex].title}
          <span className="animate-pulse text-xs">(SWIPE)</span>
        </span>
        <button
          onClick={handleNext}
          disabled={!canGoNext}
          aria-label="다음 단계"
        >
          <FaArrowAltCircleRight
            className={`transition-colors ${canGoNext ? "text-neutral-500" : "text-neutral-300"}`}
          />
        </button>
      </div>
    </div>
  );
};

export default StepTab;
