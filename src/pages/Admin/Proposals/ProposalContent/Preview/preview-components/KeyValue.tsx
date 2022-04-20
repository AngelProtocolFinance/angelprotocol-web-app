import { PropsWithChildren } from "react";

export default function KeyValue({
  _key,
  _classes = "",
  children,
}: PropsWithChildren<{}> & { _key: string; _classes?: string }) {
  return (
    <p className={`flex items-baseline gap-2 ${_classes} p-0.5`}>
      <span className="text-xs font-heading uppercase w-48">{_key}</span>
      {children}
    </p>
  );
}
