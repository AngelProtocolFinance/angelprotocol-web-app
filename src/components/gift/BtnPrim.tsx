import { BtnLink, BtnLinkProps } from "components/BtnLink";

export function BtnPrim({ className = "", ...props }: BtnLinkProps) {
  return (
    <BtnLink
      {...props}
      className={`${className} text-sm p-3 rounded btn-orange aria-disabled:pointer-events-none aria-disabled:bg-gray-l2 aria-disabled:dark:bg-bluegray-d1 font-body`}
    />
  );
}
