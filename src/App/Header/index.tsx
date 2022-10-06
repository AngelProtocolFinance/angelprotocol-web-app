import { Dialog } from "@headlessui/react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import betaWhiteLogo from "assets/images/angelprotocol-beta-horiz-wht.png";
import { useModalContext } from "contexts/ModalContext";
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
          onClick={() => showModal(Modal, { closeModal })}
          className="flex p-2 items-center text-white-grey justify-center"
        >
          <Icon type="Menu" className="text-2xl" />
        </button>
      </header>
    </>
  );
}

function Modal({ closeModal }: { closeModal: () => void }) {
  return (
    <Dialog.Panel className="fixed top-0 left-0 right-0 w-full z-10 bg-blue-accent flex flex-col">
      <header className="grid grid-cols-[auto_1fr_auto] mb-4 pt-3 items-center w-full padded-container">
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
          onClick={closeModal}
          className="flex p-2 items-center text-white-grey justify-center"
        >
          <Icon type="Close" className="text-2xl" />
        </button>
      </header>
      <div className="h-px bg-white-grey w-full col-span-3 mb-5" />
      <AppLinks />
    </Dialog.Panel>
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
    </div>
  );
}

const styler = createNavLinkStyler(
  "text-white-grey hover:text-white-grey/75 font-heading font-semibold mb-4",
  "text-angel-orange"
);
