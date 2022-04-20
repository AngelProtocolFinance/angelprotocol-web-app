import { PropsWithChildren } from "react";

export default function PreviewContainer(props: PropsWithChildren<{}>) {
  return (
    <div className="bg-white/10 shadow-inner p-2 rounded-md mb-2 mt-1">
      {props.children}
    </div>
  );
}
