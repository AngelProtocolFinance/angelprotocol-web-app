import { memo, ReactNode } from "react";
import usePortion from "./usePortion";

export type Type = "locked" | "liquid";
type Props = {
  children?: ReactNode;
  type: Type;
  title: string;
  border_class: string;
  text_class: string;
};
function Portion(props: Props) {
  const { disp_amount, disp_split } = usePortion(props.type);
  return (
    <div
      className={`flex flex-col items-center border-2 ${props.border_class} border-opacity-40 aspect-square p-2 rounded-md`}
    >
      <p className={`${props.text_class} text-lg mb-2 font-bold`}>
        {disp_split}%
      </p>
      <p className={`uppercase text-xs text-angel-grey`}>{props.title}</p>
      {props.children}
      <p className={`mt-auto ${props.text_class} font-bold text-lg`}>
        {disp_amount}
      </p>
    </div>
  );
}

export default Portion;
