import { Modal } from "components/modal";
import { Sidebar } from "../sidebar";
import type { LinkGroup } from "../types";

interface Props {
  linkGroups: LinkGroup[];
  open: boolean;
  set_open: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ToggleableSidebar({ linkGroups, set_open, open }: Props) {
  return (
    <Modal
      open={open}
      onClose={() => set_open(false)}
      classes="fixed top-0 left-0 z-20 h-full"
    >
      <Sidebar
        className="overflow-y-auto scroller"
        linkGroups={linkGroups}
        onChange={() => set_open(false)}
      />
    </Modal>
  );
}
