import { Modal } from "components/modal";
import Sidebar from "../sidebar";
import type { LinkGroup } from "../types";

interface Props {
  linkGroups: LinkGroup[];
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ToggleableSidebar({
  linkGroups,
  setOpen,
  open,
}: Props) {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      classes="fixed top-0 left-0 z-20 h-full"
    >
      <Sidebar
        className="overflow-y-auto scroller"
        linkGroups={linkGroups}
        onChange={() => setOpen(false)}
      />
    </Modal>
  );
}
