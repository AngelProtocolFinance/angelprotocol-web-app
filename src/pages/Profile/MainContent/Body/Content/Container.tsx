import { PropsWithChildren } from "react";

export default function Container(props: PropsWithChildren<{}>) {
  return (
    <div className="flex flex-col gap-px w-full border border-gray-l2 rounded">
      {props.children}
    </div>
  );
}
