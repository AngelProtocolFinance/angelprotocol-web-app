import { FC } from "react";
import { ReactNode } from "react";

type LegendLabelProps = {
  children: ReactNode;
};
export const LegendLabel: FC<LegendLabelProps> = ({ children }) => {
  return <span className="text-black font-medium">{children}</span>;
};
