import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  action: string;
  title: string;
  percentage: number;
}>;

export default function Portion(props: Props) {
  return (
    <div className="flex flex-col items-center dark:bg-blue-d6 border border-gray-l2 dark:border-bluegray p-6 rounded">
      <p className="uppercase font-bold text-sm md:text-lg">{props.title}</p>
      <p className="text-sm md:text-lg mb-2 font-bold">{props.percentage}%</p>
      <p className="uppercase text-xs text-center w-24 font-body">
        {props.action}
      </p>
      {props.children}
    </div>
  );
}
