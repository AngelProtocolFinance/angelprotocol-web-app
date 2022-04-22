import { NavLink } from "react-router-dom";
import { adminRoutes } from "types/routes";
import createNavLinkStyler from "helpers/createNavLinkStyler";

export default function AdminNav() {
  return (
    <div className="flex justify-end divide-x border-white/80">
      <NavLink end to={adminRoutes.proposals} className={styler}>
        proposals
      </NavLink>
      <NavLink to={adminRoutes.charity_applications} className={styler}>
        charity applications
      </NavLink>
    </div>
  );
}

const styler = createNavLinkStyler(
  "px-2 uppercase text-sm text-center font-semibold font-heading text-white",
  "text-angel-orange"
);
