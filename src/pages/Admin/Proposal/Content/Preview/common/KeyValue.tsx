import { PropsWithChildren } from "react";

export default function KeyValue({
  _key,
  _classes = "",
  children,
}: PropsWithChildren<{}> & { _key: string; _classes?: string }) {
  return (
    <div className={`flex items-baseline gadiv-2 ${_classes} p-0.5`}>
      <span className="text-xs font-heading uppercase w-48">{_key}</span>
      {children}
    </div>
  );
}
