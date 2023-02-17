import { adminRoutes } from "@/constants/routes";
import { createNavLinkStyler } from "@/helpers";
import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <div className="grid content-start gap-3">
      <NavLink end to={adminRoutes.proposals} className={styler}>
        proposals
      </NavLink>
    </div>
  );
}

const styler = createNavLinkStyler(
  "px-2 uppercase text-sm font-semibold font-heading text-white",
  "text-orange"
);
