import { adminRoutes } from "@giving/constants/routes";
import { createNavLinkStyler } from "@giving/helpers";
import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <div className="grid content-start gap-3">
      <NavLink end to={adminRoutes.index} className={styler}>
        Applications
      </NavLink>
      <NavLink end to={adminRoutes.proposals} className={styler}>
        proposals
      </NavLink>
    </div>
  );
}

const styler = createNavLinkStyler(
  "px-2 uppercase text-sm font-semibold font-heading",
  "text-orange-l1"
);
