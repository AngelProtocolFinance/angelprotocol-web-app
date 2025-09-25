import type { StatusProps } from "./types";

export function Status({
  icon,
  inline = false,
  classes = "",
  gap = "gap-2",
  children,
}: StatusProps) {
  return (
    <div className={`${classes} ${gap} ${inline ? "" : "flex items-center"}`}>
      {icon}
      <span>{children}</span>
    </div>
  );
}
