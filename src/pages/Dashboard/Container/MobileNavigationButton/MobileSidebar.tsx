import { Dialog } from "@headlessui/react";
import { Link, LinkGroup } from "../../types";
import { useModalContext } from "contexts/ModalContext";
import Sidebar from "../Sidebar";

export default function MobileSidebar({
  linkGroups,
  onChange,
}: {
  linkGroups: LinkGroup[];
  onChange: (link: Link) => void;
}) {
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
}
