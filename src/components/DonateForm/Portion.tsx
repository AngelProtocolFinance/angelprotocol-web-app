import { ReactNode } from "react";
import usePortion from "./usePortion";

type Props = { children?: ReactNode; type: "locked" | "liquid" };
export default function Portion(props: Props) {
  const { desc, amountTxt, splitTxt, txtColor, borderColor } = usePortion(
    props.type
  );

  return (
    <div
      className={`flex flex-col items-center border-2 ${borderColor} border-opacity-40 aspect-square p-2 rounded-md`}
    >
      <p className={`${txtColor} text-lg mb-2 font-bold`}>{splitTxt}%</p>
      <p className={`uppercase text-xs text-angel-grey`}>{desc}</p>
      {props.children}
      <p className={`mt-auto ${txtColor} font-bold text-lg`}>{amountTxt}</p>
    </div>
  );
}
