import { PropsWithChildren } from "react";

export default function Group({
  description,
  ...props
}: PropsWithChildren<{
  title: string;
  description?: string;
}>) {
  return (
    <div className="grid gap-6 p-4 @lg:p-6 border border-prim rounded bg-white dark:bg-blue-d6">
      <h3 className="text-2xl font-body">{props.title}</h3>
      {description && (
        <p className="-mt-4 text-lg font-semibold">{description}</p>
      )}
      {props.children}
    </div>
  );
}
