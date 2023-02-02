import { Dialog } from "@headlessui/react";
import ThemeToggle from "App/Header/ThemeToggle";
import { NavLink } from "react-router-dom";
import { useModalContext } from "contexts/ModalContext";
import Icon from "components/Icon";
import { createNavLinkStyler } from "helpers";
import { appRoutes } from "constants/routes";
import Logo from "../Logo";

export default function Menu() {
  const { closeModal } = useModalContext();
  return (
    <Dialog.Panel
      as="div"
      className="fixed top-0 inset-x-0 z-10 bg-blue dark:bg-blue-d5 flex flex-col gap-4 shadow-lg pb-8"
    >
      <div className="flex justify-between items-center w-full py-4 padded-container border-b border-gray-l2">
        <Logo />
        <button
          onClick={closeModal}
          className="flex items-center text-white justify-center"
        >
          <Icon type="Close" size={32} />
        </button>
      </div>
      <nav className="grid gap-3 w-full pt-4 font-extrabold font-heading text-white text-3xl">
        <NavLink to={appRoutes.index} className={navLinkStyle} end>
          Marketplace
        </NavLink>
        <NavLink to={appRoutes.leaderboard} className={navLinkStyle}>
          Leaderboard
        </NavLink>
        <NavLink to={appRoutes.register} className={navLinkStyle}>
          Register
        </NavLink>
        <span className="flex justify-between items-center mt-4">
          <span>Theme</span>
          <ThemeToggle classes="flex" />
        </span>
      </nav>
    </Dialog.Panel>
  );
}

const navLinkStyle = createNavLinkStyler(
  "text-white font-heading font-bold w-full text-3xl hover:text-orange transition ease-in-out duration-300",
  "text-orange pointer-events-none"
);
