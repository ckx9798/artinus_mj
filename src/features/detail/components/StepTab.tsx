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
            <div
              key={tab.id}
              onClick={() => handleTabClick(index)}
              className={`flex w-1/3 items-center justify-center gap-6 rounded-md p-2 transition-colors ${
                !isCurrent ? "cursor-pointer hover:bg-neutral-200" : ""
              }`}
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
            </div>
          );
        })}
      </div>

      {/* --- 모바일 탭 --- */}
      <div className="flex w-full items-center justify-center gap-12 text-sm font-semibold text-neutral-500 sm:hidden">
        <FaArrowAltCircleLeft />
        <span className="animate-pulse">SWIPE</span>
        <FaArrowAltCircleRight />
      </div>
    </div>
  );
};

export default StepTab;
