import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{}>;

export default function Dashboard(props: Props) {
  return (
    <div className="grid grid-cols-[auto_1fr] w-full h-full">
      <div className="grid w-64 max-h-[1383px] bg-white border-r border-prim"></div>
      <div className="p-10 h-full">{props.children}</div>
    </div>
  );
}
