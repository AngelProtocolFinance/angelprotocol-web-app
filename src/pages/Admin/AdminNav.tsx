import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import Icon from "components/Icon";
import createNavLinkStyler from "helpers/createNavLinkStyler";
import { adminRoutes, appRoutes, siteRoutes } from "constants/routes";
import { useAdminResources } from "./AdminGuard";

export default function AdminNav() {
  const { isAp, endowment } = useAdminResources();

  return (
    <div className="flex justify-end divide-x divide-white/60">
      {!isAp && (
        <Link
          to={`${siteRoutes.app}/${appRoutes.charity}/${endowment}`}
          className="uppercase text-sm text-center font-semibold font-heading text-white mr-auto flex items-center"
        >
          <Icon size={15} type="ArrowBack" />
          back to profile
        </Link>
      )}
      <NavLink end to={adminRoutes.proposals} className={styler}>
        proposals
      </NavLink>
      {isAp && (
        <NavLink to={adminRoutes.charity_applications} className={styler}>
          charity applications
        </NavLink>
      )}
    </div>
  );
}

const styler = createNavLinkStyler(
  "px-2 uppercase text-sm text-center font-semibold font-heading text-white",
  "text-angel-orange"
);
