import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import Icon from "components/Icon";
import { createNavLinkStyler } from "helpers";
import { adminRoutes, appRoutes } from "constants/routes";
import { useAdminResources } from "./Guard";

export default function Nav() {
  const { role, endowmentId } = useAdminResources();

  return (
    <div className="flex justify-end">
      {role === "charity" && (
        <Link
          to={`${appRoutes.profile}/${endowmentId}`}
          className="uppercase text-sm text-center font-semibold font-heading text-white mr-auto flex items-center"
        >
          <Icon size={15} type="ArrowBack" />
          back to profile
        </Link>
      )}

      {(role === "charity" || role === "reviewer") && (
        <NavLink end to={adminRoutes.index} className={styler}>
          {role === "charity" ? "Dashboard" : "Applications"}
        </NavLink>
      )}
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
