import { BtnOutline, BtnOutlineProps } from "./BtnOutline";

export function BtnSec(props: BtnOutlineProps) {
  return (
    <BtnOutline
      {...props}
      className="bg-orange-l5 dark:bg-blue-d5 text-center hover:bg-orange-l4 dark:hover:bg-blue-d3"
    />
  );
}
