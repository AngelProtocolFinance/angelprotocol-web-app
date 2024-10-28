import type { StatusProps } from "./types";

export default function Status({
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
