import { ReactNode } from "react";
import usePortion from "./usePortion";

type Type = "locked" | "liquid";

type Props = {
  children?: ReactNode;
  type: Type;
  action: string;
  title: string;
  border_class: string;
  text_class: string;
};

function Portion(props: Props) {
  const { disp_amount, disp_split } = usePortion(props.type);
  return (
    <div
      className={`flex flex-col items-center border-2 ${props.border_class} p-2 rounded-md`}
    >
      <p className={`${props.text_class} font-bold text-lg`}>{props.title}</p>
      <p className={`${props.text_class} text-lg mb-2 font-bold`}>
        {disp_split}%
      </p>
      <p className={`uppercase text-xs ${props.text_class}`}>{props.action}</p>
      {props.children}
      <p className={`mt-auto ${props.text_class} font-bold text-lg`}>
        {disp_amount}
      </p>
    </div>
  );
}

export default Portion;
