import { createNavLinkStyler } from "@ap/helpers";
import { NavLink } from "react-router-dom";
import { Link } from "../types";

type Props = { classes: string; links: Link[] };

export default function DesktopNav({ classes, links }: Props) {
  return (
    <nav className={`${classes} items-center justify-end font-body text-base`}>
      {links.map((link) => (
        <NavLink
          key={`header-link-${link.title}`}
          className={styler}
          to={link.href}
        >
          {link.title}
        </NavLink>
      ))}
    </nav>
  );
}

const styler = createNavLinkStyler(
  "px-4 text-sm text-white hover:text-orange-l1 active:text-orange transition ease-in-out duration-300 uppercase font-heading font-bold",
  "pointer-events-none text-orange"
);
