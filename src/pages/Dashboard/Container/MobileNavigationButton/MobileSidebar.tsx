import { Dialog } from "@headlessui/react";
import { Link, LinkGroup } from "../../types";
import { EndowmentProfile } from "types/aws";
import { useModalContext } from "contexts/ModalContext";
import Sidebar from "../Sidebar";

type Props = {
  linkGroups: LinkGroup[];
  profile: EndowmentProfile;
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
        profile={props.profile}
        onChange={handleChange}
      />
    </Dialog.Panel>
  );
}
