import { PropsWithChildren } from "react";

const containerClass =
  "w-full p-6 rounded-md grid content-start gap-6 rounded bg-white dark:bg-blue-d6 border border-gray-l2 dark:border-bluegray";

export function DivContainer({
  children,
  classes = "",
}: PropsWithChildren<{ classes?: string }>) {
  return <div className={containerClass + " " + classes}>{children}</div>;
}

export function FormContainer({
  className = "",
  ...props
}: React.FormHTMLAttributes<HTMLFormElement>) {
  return <form {...props} className={containerClass + " " + className} />;
}

export function GroupContainer({
  children,
  className = "",
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={`p-3 grid gap-6 rounded bg-orange-l6 dark:bg-blue-d7 border border-gray-l2 dark:border-bluegray ${className}`}
    >
      {children}
    </div>
  );
}
