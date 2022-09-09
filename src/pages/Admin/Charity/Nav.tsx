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
      <NavLink end to={adminRoutes.index} className={styler}>
        Accounts
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
