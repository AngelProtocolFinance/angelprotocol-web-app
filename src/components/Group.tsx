import { PropsWithChildren } from "react";

export default function Group({
  className = "",
  description,
  title,
  children,
}: PropsWithChildren<{
  title?: string;
  description?: string;
  className?: string;
}>) {
  return (
    <div
      className={`grid w-full gap-6 p-6 border border-prim rounded bg-white dark:bg-blue-d6 ${className}`}
    >
      {title && <h3 className="text-2xl">{title}</h3>}
      {description && (
        <p className="-mt-4 text-lg font-semibold">{description}</p>
      )}
      {children}
    </div>
  );
}
