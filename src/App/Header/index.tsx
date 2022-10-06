import { Dialog } from "@headlessui/react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import betaWhiteLogo from "assets/images/angelprotocol-beta-horiz-wht.png";
import { useModalContext } from "contexts/ModalContext";
import Icon, { IconTypes } from "components/Icon";
import TransactionHint from "components/Transactor/TransactionHint";
import Airdrop from "components/Transactors/Airdrop/Airdrop";
import WalletSuite from "components/WalletSuite";
import { useSetter } from "store/accessors";
import { setIsMobileNavOpen } from "slices/components/mobileNav";
import { createNavLinkStyler } from "helpers";
import { appRoutes } from "constants/routes";
import DesktopNav from "./DesktopNav";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const { showModal, closeModal } = useModalContext();

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
      <header className="lg:hidden">
        <MobileHeader
          onMenuClick={() => showModal(Modal, { closeModal })}
          menuIconType="Menu"
        />
      </header>
    </>
  );
}

function Modal({ closeModal }: { closeModal: () => void }) {
  return (
    <Dialog.Panel
      as="header"
      className="fixed top-0 left-0 right-0 w-full z-10 bg-blue-accent flex flex-col"
    >
      <MobileHeader onMenuClick={closeModal} menuIconType="Close" />
      <div className="h-px bg-white-grey w-full col-span-3 mb-5" />
      <AppLinks />
    </Dialog.Panel>
  );
}

function MobileHeader({
  onMenuClick,
  menuIconType,
}: {
  onMenuClick: () => void;
  menuIconType: IconTypes;
}) {
  return (
    <div className="grid grid-cols-[auto_1fr_auto]  mb-4 items-center w-full padded-container pt-3">
      <a
        rel="noreferrer"
        href="https://angelprotocol.io/"
        title="Go to Marketing page"
      >
        <img src={betaWhiteLogo} alt="" className="w-24 sm:w-36" />
      </a>
      <div className="ml-5 grid grid-cols-[auto_1fr_auto]">
        <TransactionHint />
        <WalletSuite />
        <Airdrop />
      </div>
      <button
        onClick={onMenuClick}
        className="flex p-2 items-center text-white-grey justify-center"
      >
        <Icon type={menuIconType} className="text-2xl" />
      </button>
    </div>
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
    <div className="padded-container grid col-span-3 w-full justify-items-start content-start font-extrabold font-heading ">
      <NavLink to={appRoutes.index} className={styler} end>
        Marketplace
      </NavLink>
      <NavLink to={appRoutes.leaderboard} className={styler}>
        Leaderboard
      </NavLink>
      {/*<NavLink to={appRoutes.register} className={styler}>
        Register
      </NavLink>*/}
      <span
        className={`flex justify-between items-center ${commonNavItemStyle}`}
      >
        <span>Theme</span>
        <ThemeToggle />
      </span>
    </div>
  );
}

const commonNavItemStyle =
  "text-white-grey font-heading font-semibold mb-4 w-full text-2xl";

const styler = createNavLinkStyler(
  `${commonNavItemStyle} hover:text-white-grey/75`,
  "text-angel-orange"
);
