import { createNavLinkStyler } from "helpers/create-navlink-styler";

export const styles =
  "text-blue font-body font-semibold w-full hover:underline hover:text-blue-d1 flex items-center gap-x-2";
export const styler = createNavLinkStyler(
  styles,
  "pointer-events-none text-gray-d4"
);
