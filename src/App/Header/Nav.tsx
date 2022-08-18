import { NavLink } from "react-router-dom";
import { AP_ADDR, useIsMemberQuery } from "services/juno/custom";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import { createNavLinkStyler } from "helpers";
import { chainIds } from "constants/chainIds";
import { appRoutes } from "constants/routes";

export default function DappMenu() {
  const { wallet } = useGetWallet();
  const { data: isMember } = useIsMemberQuery(
    { user: wallet?.address!, endowment: AP_ADDR },
    { skip: !wallet || wallet.chain.chain_id !== chainIds.juno }
  );
  return (
    <nav className="hidden lg:flex lg:row-start-1 lg:col-span-1 lg:col-start-2 flex justify-self-end items-center font-body text-sm lg:text-base ml-2">
      <NavLink className={styler} to={appRoutes.index}>
        Marketplace
      </NavLink>
      {/* 
      NOTE: governance will be reenabled when we relaunch the $HALO token
      <NavLink to={appRoutes.govern} className={styler}>
        Governance
      </NavLink> */}
      <NavLink to={appRoutes.leaderboard} className={styler}>
        Leaderboard
      </NavLink>
      {isMember && (
        <NavLink to={`${appRoutes.admin}/${AP_ADDR}`} className={styler}>
          Admin
        </NavLink>
      )}
    </nav>
  );
}

const styler = createNavLinkStyler(
  "py-3 px-4 text-white-grey hover:text-white-grey/75 uppercase inline-flex items-center font-heading font-semibold",
  "rounded-md bg-white/10 shadow-inner pointer-events-none"
);
