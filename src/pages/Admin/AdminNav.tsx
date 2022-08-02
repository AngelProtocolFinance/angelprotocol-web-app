import { NavLink } from "react-router-dom";
import createNavLinkStyler from "helpers/createNavLinkStyler";
import { adminRoutes } from "constants/routes";

export default function AdminNav() {
  //TODO: add back to profile if not ap
  /**
   * <Link
        to={`${siteRoutes.app}/${appRoutes.charity}/${endowmentAddress}`}
        className={linkStyle + " mr-auto flex items-center"}
      >
        <Icon size={15} type="ArrowBack" />
        back to profile
      </Link>
   */
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
