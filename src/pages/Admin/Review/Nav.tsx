import { NavLink } from "react-router-dom";
import { createNavLinkStyler } from "helpers";
import { adminRoutes } from "constants/routes";

export default function Nav() {
  return (
    <div className="flex justify-end">
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
  "px-2 uppercase text-sm text-center font-semibold font-heading text-white-grey",
  "text-angel-orange"
);
