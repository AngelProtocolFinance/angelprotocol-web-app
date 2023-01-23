import { BtnLink, BtnLinkProps } from "components/BtnLink";

export function BtnOutline({ className = "", ...props }: BtnLinkProps) {
  return (
    <BtnLink
      {...props}
      className={`${className} text-sm md:text-base p-3 rounded border border-prim text-center hover:border-gray-l1 hover:dark:border-blue-d2 font-bold font-body`}
    />
  );
}
