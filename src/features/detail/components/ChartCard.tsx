import type { ReactElement } from "react";
import { ResponsiveContainer } from "recharts";

interface ChartCardProps {
  title: string;
  children: ReactElement;
}

const ChartCard = ({ title, children }: ChartCardProps) => {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-2 shadow-sm md:p-6">
      <h3 className="text-base font-semibold text-neutral-800 md:text-lg">
        {title}
      </h3>
      <div className="mt-6 h-80 w-full md:h-96">
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartCard;
