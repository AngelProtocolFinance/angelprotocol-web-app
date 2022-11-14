import { createNavLinkStyler } from "helpers";

export const adminMobileNavId = "admin_mobile_nav";

export const commonNavItemStyle =
  "text-white font-heading font-bold w-full text-2xl";

export const navLinkStyle = createNavLinkStyler(
  `${commonNavItemStyle} hover:text-orange-l6`,
  "text-orange pointer-events-none"
);
