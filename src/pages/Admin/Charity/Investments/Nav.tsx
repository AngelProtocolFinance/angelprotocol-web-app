import { NavLink } from "react-router-dom";
import { createNavLinkStyler } from "helpers";
import { investmentRoutes } from "constants/routes";

export default function Nav() {
  return (
    <div className="grid grid-cols-4 divide-x divide-zinc-50/30 border-b border-zinc-50/30">
      <NavLink end to={investmentRoutes.index} className={styler}>
        Balances
      </NavLink>
      <NavLink end to={investmentRoutes.invest_redeem} className={styler}>
        Invest/redeem
      </NavLink>
      <NavLink end to={investmentRoutes.withdraw} className={styler}>
        withdraw
      </NavLink>
      <NavLink end to={investmentRoutes.strategies} className={styler}>
        Auto-investment strategies
      </NavLink>
    </div>
  );
}

const styler = createNavLinkStyler(
  "uppercase text-sm text-center font-semibold font-heading text-white-grey p-3",
  "bg-zinc-50/10"
);
