import { createNavLinkStyler } from "helpers";

export const adminMobileNavId = "admin_mobile_nav";

export const commonNavItemStyle =
  "text-white font-heading font-semibold mb-4 w-full text-2xl";

export const navLinkStyle = createNavLinkStyler(
  `${commonNavItemStyle} hover:text-orange-l6`,
  "text-orange-l2 pointer-events-none"
);
