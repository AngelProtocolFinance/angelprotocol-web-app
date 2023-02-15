import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Link, LinkGroup } from "./types";
import { useModalContext } from "contexts/ModalContext";
import MobileSidebar from "./MobileSidebar";

export default function useMobileSidebar(
  endowId: number,
  linkGroups: LinkGroup[]
) {
  const location = useLocation();

  const [activeLink, setActiveLink] = useState<Link>(() => {
    for (const group of linkGroups) {
      for (const link of group.links) {
        if (link.to === location.pathname) {
          return link;
        }
      }
    }

    return { title: "Open Menu", icon: { type: "Menu", size: 24 }, to: "" };
  });

  const { showModal } = useModalContext();

  const open = () =>
    showModal(MobileSidebar, {
      linkGroups,
      endowId,
      onChange: (link) => setActiveLink(link),
    });

  return { open, activeLink };
}
