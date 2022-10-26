import { PropsWithChildren } from "react";
import usePortion from "./usePortion";

type Props = PropsWithChildren<{
  type: "locked" | "liquid";
  action: string;
  title: string;
}>;
export default function Portion({ type, title, action, children }: Props) {
  const { disp_amount, disp_split } = usePortion(type);
  return (
    <div className="flex flex-col items-center dark:bg-blue-d7 border border-gray-l2 dark:border-bluegray-d1 p-6 rounded">
      <p className="uppercase font-bold text-lg">{title}</p>
      <p className=" text-lg mb-2 font-bold">{disp_split}%</p>
      <p className="uppercase text-xs text-center w-24">{action}</p>
      {children}
      <p className="mt-auto font-bold text-lg text-center w-36">
        {disp_amount}
      </p>
    </div>
  );
}
