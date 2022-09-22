import { createPortal } from "react-dom";
import { NavLink } from "react-router-dom";
import { useGetter } from "store/accessors";
import { adminRoutes, appRoutes } from "constants/routes";
import { styler } from "../../helpers";

export const ADMIN_NAV_PORTAL_ID = "admin_nav_portal";
export function Main({ id }: { id: number }) {
  const { isMobileNavOpen } = useGetter((state) => state.component.mobileNav);
  const baseLink = `${appRoutes.admin}/${id}`;
  return (
    (isMobileNavOpen &&
      createPortal(
        <>
          <h4 className="uppercase text-sm font-bold text-angel-grey mb-2">
            Admin
          </h4>
          <div className="grid justify-items-start uppercase text-sm font-heading gap-1">
            <NavLink end to={baseLink} className={styler}>
              Dashboard
            </NavLink>
            <NavLink
              end
              to={`${baseLink}/${adminRoutes.withdraws}`}
              className={styler}
            >
              Withdraws
            </NavLink>
            <NavLink
              end
              to={`${baseLink}/${adminRoutes.investments}`}
              className={styler}
            >
              Investments
            </NavLink>
            <NavLink
              end
              to={`${baseLink}/${adminRoutes.edit_profile}`}
              className={styler}
            >
              Edit Profile
            </NavLink>
            <NavLink
              end
              to={`${baseLink}/${adminRoutes.proposals}`}
              className={styler}
            >
              Proposals
            </NavLink>
          </div>
        </>,
        document.querySelector(`#${ADMIN_NAV_PORTAL_ID}`)!
      )) ||
    null
  );
}
