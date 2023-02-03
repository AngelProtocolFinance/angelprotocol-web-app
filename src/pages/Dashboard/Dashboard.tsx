import { PropsWithChildren } from "react";
import Sidebar from "./Sidebar";

type Props = PropsWithChildren<{}>;

export default function Dashboard(props: Props) {
  return (
    <div className="grid grid-cols-[auto_1fr] w-full h-full">
      <Sidebar />
      <div className="p-10 h-full">{props.children}</div>
    </div>
  );
}
