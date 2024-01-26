import { NavLink } from "react-router-dom";
import { Link } from "../types";
import ExtLink from "components/ExtLink";
import { createNavLinkStyler } from "helpers";

type Props = { classes: string; links: Link[] };

const styles = "px-4 transition ease-in-out duration-300 hover:text-orange-l1";

export default function DesktopNav({ classes, links }: Props) {
  return (
    <nav
      className={`${classes} items-center justify-end font-body text-blue text-sm bg-white`}
    >
      {links.map((link) =>
        link.external ? (
          <ExtLink
            key={`header-link-${link.title}`}
            className={styles}
            href={link.href}
          >
            {link.title}
          </ExtLink>
        ) : (
          <NavLink
            key={`header-link-${link.title}`}
            end={link.end}
            to={link.href}
            className={createNavLinkStyler(
              styles,
              "pointer-events-none text-orange-l1",
            )}
          >
            {link.title}
          </NavLink>
        ),
      )}
    </nav>
  );
}
