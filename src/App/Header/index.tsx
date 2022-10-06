import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import betaWhiteLogo from "assets/images/angelprotocol-beta-horiz-wht.png";
import Icon from "components/Icon";
import TransactionHint from "components/Transactor/TransactionHint";
import Airdrop from "components/Transactors/Airdrop/Airdrop";
import WalletSuite from "components/WalletSuite";
import { useSetter } from "store/accessors";
import { setIsMobileNavOpen } from "slices/components/mobileNav";
import { createNavLinkStyler } from "helpers";
import { appRoutes } from "constants/routes";
import DesktopNav from "./DesktopNav";

export default function Header() {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <>
      <header className="hidden lg:grid grid-cols-[auto_1fr_auto] mb-4 items-center w-full padded-container pt-3">
        <a
          rel="noreferrer"
          href="https://angelprotocol.io/"
          title="Go to Marketing page"
        >
          <img src={betaWhiteLogo} alt="" className="w-32 sm:w-36" />
        </a>
        <DesktopNav />
        <div className="ml-5 grid grid-cols-[auto_1fr_auto]">
          <TransactionHint />
          <WalletSuite />
          <Airdrop />
        </div>
      </header>
      <header className="grid grid-cols-[auto_1fr_auto] gap-y-5 lg:hidden mb-4 items-center w-full padded-container pt-3">
        <a
          rel="noreferrer"
          href="https://angelprotocol.io/"
          title="Go to Marketing page"
        >
          <img src={betaWhiteLogo} alt="" className="w-32 sm:w-36" />
        </a>
        <div className="ml-5 grid grid-cols-[auto_1fr_auto]">
          <TransactionHint />
          <WalletSuite />
          <Airdrop />
        </div>
        <button
          onClick={() => setMobileNavOpen((prev) => !prev)}
          className="flex p-2 items-center text-white-grey justify-center"
        >
          <Icon
            type={isMobileNavOpen ? "Close" : "Menu"}
            className="text-2xl"
          />
        </button>
        {isMobileNavOpen && <AppLinks />}
      </header>
    </>
  );
}

function AppLinks() {
  const dispatch = useSetter();
  useEffect(() => {
    //set open state after portal node has been mounted
    dispatch(setIsMobileNavOpen(true));

    return () => {
      dispatch(setIsMobileNavOpen(false));
    };
  }, [dispatch]);

  return (
    <div className="grid col-span-3 justify-items-start content-start uppercase font-extrabold font-heading border-t-2 border-white-grey">
      <NavLink to={appRoutes.index} className={styler} end>
        Marketplace
      </NavLink>
      <NavLink to={appRoutes.leaderboard} className={styler}>
        Leaderboard
      </NavLink>
      {/*<NavLink to={appRoutes.register} className={styler}>
        Register
      </NavLink>*/}
    </div>
  );
}

const styler = createNavLinkStyler(
  "text-white-grey hover:text-white-grey/75 uppercase font-heading font-semibold",
  "text-angel-orange"
);
