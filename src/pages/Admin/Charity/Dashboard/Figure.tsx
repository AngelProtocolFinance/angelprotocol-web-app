import type { ReactNode } from "react";

type Props = {
  title: string;
  icon: ReactNode;
  /** e.g. $100,000 */
  amount: string;
};

export default function Figure(props: Props) {
  return (
    <div className="@container rounded border border-gray-l4 p-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm">{props.title}</h4>
        {props.icon}
      </div>
      <p className="text-2xl font-medium">{props.amount}</p>
    </div>
  );
}
