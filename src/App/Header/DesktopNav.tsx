import { NavLink } from "react-router-dom";
import ExtLink from "components/ExtLink";
import { createNavLinkStyler } from "helpers";
import { BASE_DOMAIN } from "constants/common";
import { appRoutes } from "constants/routes";

export default function DesktopNav({ classes = "" }: { classes?: string }) {
  return (
    <nav className={`${classes} items-center justify-end font-body text-base`}>
      <ExtLink className={styles} href={BASE_DOMAIN}>
        For Non-Profits
      </ExtLink>
      <NavLink className={styler} to={appRoutes.index}>
        Marketplace
      </NavLink>
      <ExtLink href={`${BASE_DOMAIN}/csr-partners/`} className={styles}>
        Giving Partners
      </ExtLink>
      <ExtLink href={`${BASE_DOMAIN}/about-angel-giving/`} className={styles}>
        About
      </ExtLink>
    </nav>
  );
}

const styles =
  "px-4 text-sm text-white hover:text-orange-l1 active:text-orange transition ease-in-out duration-300 uppercase font-heading font-bold";
const styler = createNavLinkStyler(styles, "pointer-events-none text-orange");
