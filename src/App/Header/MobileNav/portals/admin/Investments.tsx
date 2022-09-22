import { createPortal } from "react-dom";
import { NavLink } from "react-router-dom";
import { useGetter } from "store/accessors";
import { adminRoutes, appRoutes, investmentRoutes } from "constants/routes";
import { styler } from "../../helpers";

export const ADMIN_INVESTMENTS_PORTAL_ID = "admin_investments_portal";
export function Investments({ id }: { id: number }) {
  const { isMobileNavOpen } = useGetter((state) => state.component.mobileNav);
  const baseLink = `${appRoutes.admin}/${id}/${adminRoutes.investments}`;
  return (
    (isMobileNavOpen &&
      createPortal(
        <>
          <h4 className="uppercase text-sm font-bold text-angel-grey mb-2">
            Investments
          </h4>
          <div className="grid justify-items-start uppercase text-sm font-heading gap-1">
            <NavLink end to={baseLink} className={styler}>
              Balances
            </NavLink>
            <NavLink
              end
              to={`${baseLink}/${investmentRoutes.invest_redeem}`}
              className={styler}
            >
              Invest/Redeem
            </NavLink>
            <NavLink
              end
              to={`${baseLink}/${investmentRoutes.strategies}`}
              className={styler}
            >
              Strategies
            </NavLink>
          </div>
        </>,
        document.querySelector(`#${ADMIN_INVESTMENTS_PORTAL_ID}`)!
      )) ||
    null
  );
}
