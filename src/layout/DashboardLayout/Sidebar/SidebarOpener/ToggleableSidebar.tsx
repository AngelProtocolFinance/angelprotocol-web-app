import { DialogPanel } from "@headlessui/react";
import { useModalContext } from "contexts/ModalContext";
import Sidebar from "../Sidebar";
import type { LinkGroup } from "../types";

type Props = { linkGroups: LinkGroup[] };

export default function ToggleableSidebar({ linkGroups }: Props) {
  const { closeModal } = useModalContext();

  return (
    <DialogPanel className="fixed top-0 left-0 z-20 h-full">
      <Sidebar
        className="overflow-y-auto scroller"
        linkGroups={linkGroups}
        onChange={closeModal}
      />
    </DialogPanel>
  );
}
