import { BtnLink, BtnLinkProps } from "components/BtnLink";

export function BtnPrim({ className = "", ...props }: BtnLinkProps) {
  return (
    <BtnLink
      {...props}
      className={`${className} p-3 rounded btn-orange aria-disabled:pointer-events-none aria-disabled:dark:bg-gray font-body`}
    />
  );
}
