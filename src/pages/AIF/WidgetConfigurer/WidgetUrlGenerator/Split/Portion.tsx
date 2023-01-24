import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  action: string;
  title: string;
  percentage: number;
}>;

export default function Portion(props: Props) {
  return (
    <div className="flex flex-col items-center w-48 aspect-square p-6 bg-orange-l6 dark:bg-blue-d6 border border-prim rounded">
      <p className="uppercase font-bold text-sm sm:text-base">{props.title}</p>
      <p className="text-xs sm:text-sm mb-2 font-bold">{props.percentage}%</p>
      <p className="uppercase text-xs sm:text-sm text-center font-body">
        {props.action}
      </p>
      {props.children}
    </div>
  );
}
