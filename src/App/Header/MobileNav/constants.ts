import { createNavLinkStyler } from "helpers";

export const adminMobileNavId = "admin_mobile_nav";

export const commonNavItemStyle =
  "text-white font-heading font-bold w-full text-3xl";

export const navStyle = `${commonNavItemStyle} hover:text-orange transition ease-in-out duration-300`;
export const navLinkStyle = createNavLinkStyler(
  navStyle,
  "text-orange pointer-events-none"
);
