import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};
export default function View(props: Props) {
  return (
    <div
      className={`${
        props.className || ""
      } relative min-h-leader-table p-6 pt-10 my-5 mt-2 grid place-items-center overflow-hidden bg-white rounded-xl shadow-lg padded-container`}
    >
      {props.children}
    </div>
  );
}
