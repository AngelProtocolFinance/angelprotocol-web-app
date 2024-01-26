import { PropsWithChildren } from "react";

const containerClass =
  "w-full p-6 rounded-md grid content-start gap-6 rounded bg-white dark:bg-blue-d6 border border-prim group";

export function DivContainer({
  disabled,
  children,
  classes = "",
}: PropsWithChildren<{ classes?: string; disabled?: boolean }>) {
  return (
    <fieldset disabled={disabled} className={`${containerClass} ${classes}`}>
      {children}
    </fieldset>
  );
}
