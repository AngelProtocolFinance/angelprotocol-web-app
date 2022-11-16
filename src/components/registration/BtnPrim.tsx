import { BtnLink, BtnLinkProps } from "components/BtnLink";

export function BtnPrim({ className = "", ...props }: BtnLinkProps) {
  return (
    <BtnLink
      {...props}
      className={`${className} "text-sm p-3 rounded btn-orange font-body"`}
    />
  );
}
