import { Dialog } from "@headlessui/react";
import { Link, LinkGroup } from "../../types";
import { EndowmentProfile } from "types/aws";
import { useModalContext } from "contexts/ModalContext";
import Sidebar from "../Sidebar";

export default function MobileSidebar({
  linkGroups,
  profile,
  onChange,
}: {
  linkGroups: LinkGroup[];
  profile: EndowmentProfile;
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
        profile={profile}
        onChange={handleChange}
      />
    </Dialog.Panel>
  );
}
