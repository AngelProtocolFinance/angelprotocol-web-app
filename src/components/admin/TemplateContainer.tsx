import { PropsWithChildren } from "react";

const containerClass =
  "w-full p-6 rounded-md grid content-start gap-6 rounded bg-white dark:bg-blue-d6 border border-prim group";

export function DivContainer({
  disabled,
  children,
  classes = "",
}: PropsWithChildren<{ classes?: string; disabled?: boolean }>) {
  return (
    <fieldset disabled={disabled} className={containerClass + " " + classes}>
      {children}
    </fieldset>
  );
}

export function FormContainer({
  className = "",
  children,
  ...props
}: React.FormHTMLAttributes<HTMLFormElement>) {
  return (
    <form {...props} className={containerClass + " " + className}>
      <fieldset className="contents" disabled={!!props["aria-disabled"]}>
        {children}
      </fieldset>
    </form>
  );
}

export function GroupContainer({
  children,
  className = "",
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={`p-3 pb-6 grid gap-6 rounded bg-orange-l6 dark:bg-blue-d7 border border-prim ${className}`}
    >
      {children}
    </div>
  );
}
