import { Dialog } from "@headlessui/react";
import { Link, LinkGroup } from "./types";
import { useModalContext } from "contexts/ModalContext";
import Sidebar from "./Sidebar";

type Props = {
  linkGroups: LinkGroup[];
  endowId: number;
  onChange: (link: Link) => void;
};

export default function MobileSidebar(props: Props) {
  const { closeModal } = useModalContext();

  const handleChange = (link: Link) => {
    props.onChange(link);
    closeModal();
  };

  return (
    <Dialog.Panel className="fixed top-0 left-0 z-20">
      <Sidebar
        className="max-h-screen overflow-y-auto scroller"
        linkGroups={props.linkGroups}
        endowId={props.endowId}
        onChange={handleChange}
      />
    </Dialog.Panel>
  );
}
