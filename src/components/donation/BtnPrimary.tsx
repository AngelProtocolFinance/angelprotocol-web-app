import { BtnLink, BtnLinkProps } from "components/BtnLink";

export function BtnPrimary({ className = "", ...props }: BtnLinkProps) {
  return (
    <BtnLink
      {...props}
      className={`${className} text-sm md:text-base p-3 rounded btn-orange font-body`}
      style={{ textTransform: "none" } /** override btn-orange */}
    />
  );
}
