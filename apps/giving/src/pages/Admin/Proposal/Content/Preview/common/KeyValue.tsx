import { PropsWithChildren } from "react";

export default function KeyValue({
  _key,
  _classes = "",
  children,
}: PropsWithChildren & { _key: string; _classes?: string }) {
  return (
    <div
      className={`flex items-baseline gap-2 ${_classes} p-0.5 text-gray-d1 dark:text-gray`}
    >
      <span className="text-xs font-heading uppercase w-48 text-gray-d2 dark:text-white">
        {_key}
      </span>
      {children}
    </div>
  );
}
