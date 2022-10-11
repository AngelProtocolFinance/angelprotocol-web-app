import { createNavLinkStyler } from "helpers";

export const adminMobileNavId = "admin_mobile_nav";

export const commonNavItemStyle =
  "text-white-grey font-heading font-semibold mb-4 w-full text-2xl";

export const navLinkStyle = createNavLinkStyler(
  `${commonNavItemStyle} hover:text-white-grey/75`,
  "text-angel-orange"
);
