import Icon from "@giving/components/Icon";
import Logo, { LogoProps } from "@giving/components/Logo";
import { createNavLinkStyler } from "@giving/helpers";
import { Dialog } from "@headlessui/react";
import ThemeToggle from "App/Header/ThemeToggle";
import { NavLink } from "react-router-dom";
import { Link } from "../../types";
import { useModalContext } from "contexts/ModalContext";

export default function Menu({
  links,
  logo,
}: {
  links: Link[];
  logo: LogoProps;
}) {
  const { closeModal } = useModalContext();
  return (
    <Dialog.Panel
      as="div"
      className="fixed top-0 inset-x-0 z-10 bg-blue dark:bg-blue-d5 shadow-lg pb-8"
    >
      <div className="flex justify-between items-center w-full py-4 padded-container border-b border-gray-l2">
        <Logo className="w-32" logo={logo} />
        <button
          onClick={closeModal}
          className="flex items-center text-white justify-center"
        >
          <Icon type="Close" size={32} />
        </button>
      </div>
      <nav className="mt-8 grid gap-y-4 w-full px-6 font-extrabold font-heading text-white text-3xl">
        {links.map((link) => (
          <NavLink
            key={`header-link-${link.title}`}
            className={navLinkStyle}
            to={link.href}
          >
            {link.title}
          </NavLink>
        ))}
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
