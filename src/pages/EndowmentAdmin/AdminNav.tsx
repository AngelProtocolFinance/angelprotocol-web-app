import { Link, NavLink, useParams } from "react-router-dom";
import { EndowmentAdminParams } from "./types";
import Icon from "components/Icon";
import { createNavLinkStyler } from "helpers";
import { adminRoutes, appRoutes } from "constants/routes";

export default function AdminNav() {
  const { address: endowmentAddress } = useParams<EndowmentAdminParams>();
  return (
    <div className="flex justify-end ">
      <Link
        to={`${appRoutes.charity}/${endowmentAddress}`}
        className={linkStyle + " mr-auto flex items-center"}
      >
        <Icon size={15} type="ArrowBack" />
        back to profile
      </Link>
      <NavLink end to={adminRoutes.index} className={styler}>
        dashboard
      </NavLink>
      <NavLink to={adminRoutes.proposals} className={styler}>
        proposals
      </NavLink>
    </div>
  );
}

const linkStyle =
  "px-2 uppercase text-sm text-center font-semibold font-heading text-white border-r border-white/90 last:border-r-0 first:border-r-0";
const styler = createNavLinkStyler(linkStyle, "text-angel-orange");
