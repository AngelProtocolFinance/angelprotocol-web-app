import { NavLink } from "react-router-dom";
import { Link } from "../types";
import { createNavLinkStyler } from "helpers";

type Props = { classes: string; links: Link[] };

export default function DesktopNav({ classes, links }: Props) {
  return (
    <nav className={`${classes} items-center justify-end font-body text-base`}>
      {links.map((link) =>
        link.external ? (
          <a
            key={`header-link-${link.title}`}
            className={styles}
            href={link.href}
            target="_blank"
            rel="noreferrer"
          >
            {link.title}
          </a>
        ) : (
          <NavLink
            key={`header-link-${link.title}`}
            className={styler}
            to={link.href}
          >
            {link.title}
          </NavLink>
        )
      )}
    </nav>
  );
}

const styles =
  "px-4 text-sm text-white hover:text-orange-l1 active:text-orange transition ease-in-out duration-300 uppercase font-heading font-bold";
const styler = createNavLinkStyler(styles, "pointer-events-none text-orange");
