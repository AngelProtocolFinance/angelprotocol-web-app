import { BtnLink, BtnLinkProps } from "components/BtnLink";

export function BtnSec({ className = "", ...props }: BtnLinkProps) {
  return (
    <BtnLink
      {...props}
      className={`${className} text-sm p-3 uppercase rounded border border-gray-l2 dark:border-bluegray hover:border-gray-l1 hover:dark:border-blue-d2 font-bold font-body bg-orange-l5 dark:bg-blue-d5 aria-disabled:pointer-events-none disabled:bg-gray disabled:cursor-auto aria-disabled:dark:bg-bluegray-d1 text-center hover:bg-orange-l4 dark:hover:bg-blue-d3`}
    />
  );
}
