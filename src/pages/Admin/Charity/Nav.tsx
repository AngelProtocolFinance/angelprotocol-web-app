import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import Icon from "components/Icon";
import { createNavLinkStyler } from "helpers";
import { adminRoutes, appRoutes } from "constants/routes";
import { useAdminResources } from "../Guard";
import { routes } from "./routes";

export default function Nav() {
  const { endowmentId } = useAdminResources();

  return (
    <div className="flex justify-end">
      <Link
        to={`${appRoutes.profile}/${endowmentId}`}
        className="uppercase text-sm text-center font-semibold font-heading text-white mr-auto flex items-center"
      >
        <Icon size={15} type="ArrowBack" />
        back to profile
      </Link>
      <NavLink end to={adminRoutes.index} className={styler}>
        Dashboard
      </NavLink>
      <NavLink end to={routes.transactions} className={styler}>
        Transactions
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
