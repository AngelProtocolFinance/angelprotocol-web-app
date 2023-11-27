import { PropsWithChildren } from "react";

export default function Group({
  description,
  title,
  children,
}: PropsWithChildren<{
  title?: string;
  description?: string;
}>) {
  return (
    <div className="grid gap-6 p-6 border border-gray-l3 dark:border-blue-gray rounded bg-white dark:bg-blue-d6">
      {title && <h3 className="text-2xl font-body">{title}</h3>}
      {description && (
        <p className="-mt-4 text-lg font-semibold">{description}</p>
      )}
      {children}
    </div>
  );
}
