import { FC } from "react";

type LegendLabelProps = {
  explanation?: string;
};

export const LegendLabel: FC<LegendLabelProps> = ({
  explanation,
  children,
}) => {
  return (
    <span className="text-black font-medium">
      {children}
      {!!explanation && (
        <span className="text-gray-500 text-sm ml-1">{explanation}</span>
      )}
    </span>
  );
};
