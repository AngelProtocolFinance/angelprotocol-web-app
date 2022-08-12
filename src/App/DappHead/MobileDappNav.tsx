import { NavLink } from "react-router-dom";
import { AP_ADDR, useIsMemberQuery } from "services/juno/custom";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import createNavLinkStyler from "helpers/createNavLinkStyler";
import { chainIds } from "constants/chainIds";
import { appRoutes } from "constants/routes";

const styler = createNavLinkStyler(
  "text-white/75 uppercase inline-flex items-center font-heading",
  "text-angel-orange"
);
//Will be for WebNav
export default function MobileDappNav() {
  const { wallet } = useGetWallet();
  const { data: isMember } = useIsMemberQuery(
    { user: wallet?.address!, endowment: AP_ADDR },
    { skip: !wallet || wallet.chain.chain_id !== chainIds.juno }
  );

  return (
    <nav className="lg:hidden flex flex-col items-end col-span-3 rounded-sm w-full font-extrabold text-base gap-1 pt-2">
      <NavLink to={appRoutes.marketplace} className={styler}>
        Marketplace
      </NavLink>
      {/* 
      NOTE: Governance will be reenabled when we relaunch the $HALO token
      <NavLink to={appRoutes.govern} className={styler}>
        Governance
      </NavLink> */}
      <NavLink to={appRoutes.leaderboard} className={styler}>
        Leaderboard
      </NavLink>
      {isMember && (
        <NavLink to={`${appRoutes.admin}/${AP_ADDR}}`} className={styler}>
          Admin
        </NavLink>
      )}
    </nav>
  );
}
