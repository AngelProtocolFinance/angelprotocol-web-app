import { Dialog } from "@headlessui/react";
import ExtLink from "components/ExtLink";
import Icon from "components/Icon";
import { DappLogo } from "components/Image";
import { useModalContext } from "contexts/ModalContext";
import { createNavLinkStyler } from "helpers";
import { NavLink } from "react-router-dom";
import { Link } from "../../types";

export default function Menu({ links }: { links: Link[] }) {
  const { closeModal } = useModalContext();
  return (
    <Dialog.Panel
      as="div"
      className="fixed top-0 inset-x-0 z-10 bg-white dark:bg-blue-d5 shadow-lg pb-8"
    >
      <div className="flex justify-between items-center w-full py-4 padded-container border-b border-gray-l2">
        <DappLogo classes="w-32" />
        <button
          onClick={closeModal}
          className="flex items-center text-blue justify-center"
        >
          <Icon type="Close" size={32} />
        </button>
      </div>
      <nav className="mt-8 grid gap-y-4 w-full px-6 font-extrabold font-heading text-blue text-3xl">
        {links.map((link) =>
          link.external ? (
            <ExtLink
              key={`header-link-${link.title}`}
              className={styles}
              href={link.href}
            >
              {link.title}
            </ExtLink>
          ) : (
            <NavLink
              key={`header-link-${link.title}`}
              className={styler}
              to={link.href}
              end={link.end}
            >
              {link.title}
            </NavLink>
          ),
        )}
      </nav>
    </Dialog.Panel>
  );
}

const styles =
  "text-blue font-heading font-bold w-full text-3xl hover:text-orange transition ease-in-out duration-300";
const styler = createNavLinkStyler(styles, "pointer-events-none text-orange");
