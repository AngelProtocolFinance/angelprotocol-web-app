import { Dialog } from "@headlessui/react";
import { LinkGroup } from "../types";
import { useModalContext } from "contexts/ModalContext";
import Sidebar from "./Sidebar";

type Props = { className?: string; linkGroups: LinkGroup[] };

export default function ActivePageButton({
  className = "",
  linkGroups,
}: Props) {
  const { showModal } = useModalContext();

  const openSidebar = () => showModal(MobileSidebar, { linkGroups });

  return (
    <button
      type="button"
      onClick={openSidebar}
      className={`flex items-center gap-2 py-5 px-6 dark:bg-blue-d6 border-b border-prim font-bold text-sm ${className}`}
    >
      active
    </button>
  );
}

const MobileSidebar = ({ linkGroups }: { linkGroups: LinkGroup[] }) => (
  <Dialog.Panel className="fixed top-0 left-0 z-20">
    <Sidebar
      linkGroups={linkGroups}
      className="max-h-screen overflow-y-auto scroller"
    />
  </Dialog.Panel>
);
