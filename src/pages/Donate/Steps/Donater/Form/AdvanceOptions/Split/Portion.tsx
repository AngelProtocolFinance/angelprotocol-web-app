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
    <div className="flex flex-col items-center border-2 p-2 rounded-md">
      <p className=" font-bold text-lg">{title}</p>
      <p className=" text-lg mb-2 font-bold">{disp_split}%</p>
      <p className="uppercase text-xs ">{action}</p>
      {children}
      <p className="mt-auto font-bold text-lg">{disp_amount}</p>
    </div>
  );
}
