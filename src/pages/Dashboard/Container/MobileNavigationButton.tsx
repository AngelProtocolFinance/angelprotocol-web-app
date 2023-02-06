import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Link, LinkGroup } from "../types";
import { useModalContext } from "contexts/ModalContext";
import Icon from "components/Icon";
import { UnexpectedStateError } from "errors/errors";
import Sidebar from "./Sidebar";

type Props = { className?: string; linkGroups: LinkGroup[] };

export default function MobileNavigationButton({
  className = "",
  linkGroups,
}: Props) {
  const location = useLocation();

  const [activeLink, setActiveLink] = useState<Link>(() => {
    for (const group of linkGroups) {
      for (const link of group.links) {
        if (link.to === location.pathname) {
          return link;
        }
      }
    }
    throw new UnexpectedStateError(
      `No link matches current path ${location.pathname}`
    );
  });

  const { showModal } = useModalContext();

  const openSidebar = () =>
    showModal(MobileSidebar, {
      linkGroups,
      onChange: (link) => setActiveLink(link),
    });

  return (
    <button
      type="button"
      onClick={openSidebar}
      className={`flex items-center gap-2 py-5 px-6 dark:bg-blue-d6 border-b border-prim font-bold text-sm text-orange ${className}`}
    >
      {activeLink && (
        <>
          <Icon type={activeLink.icon} size={24} />
          {activeLink.title}
          <Icon type="ArrowRight" size={24} className="ml-auto" />
        </>
      )}
    </button>
  );
}

const MobileSidebar = ({
  linkGroups,
  onChange,
}: {
  linkGroups: LinkGroup[];
  onChange: (link: Link) => void;
}) => {
  const { closeModal } = useModalContext();

  const handleChange = (link: Link) => {
    onChange(link);
    closeModal();
  };

  return (
    <Dialog.Panel className="fixed top-0 left-0 z-20">
      <Sidebar
        className="max-h-screen overflow-y-auto scroller"
        linkGroups={linkGroups}
        onChange={handleChange}
      />
    </Dialog.Panel>
  );
};
