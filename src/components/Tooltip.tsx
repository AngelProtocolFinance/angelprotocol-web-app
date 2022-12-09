import { Transition } from "@headlessui/react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { logger } from "helpers";

type Props = { anchorId: string; content: string };

export default function Tooltip({ anchorId, content }: Props) {
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const [isHovered, setHovered] = useState(false);

  useEffect(() => {
    if (!anchorId) {
      return;
    }

    const anchor = document.getElementById(anchorId);
    if (!anchor) {
      return logger.error(`No element with ID '${anchorId}'`);
    }

    const pos = anchor.getBoundingClientRect();

    setTop(pos.top);
    setLeft(pos.left);

    const handleMouseEnter = () => setHovered(true);
    const handleMouseLeave = () => setHovered(false);
    anchor.addEventListener("mouseenter", handleMouseEnter);
    anchor.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      anchor.removeEventListener("mouseenter", handleMouseEnter);
      anchor.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [anchorId]);

  return createPortal(
    <Transition
      show={isHovered}
      enter="transition-opacity duration-500"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className="absolute -translate-x-1/2 -translate-y-full -mt-2 ml-2.5 z-50 flex items-center justify-center px-3 py-2 rounded bg-gray-d2 dark:bg-white font-normal font-body text-sm w-max max-w-[200px] text-white dark:text-gray-d2 after:content-[''] after:absolute after:top-full after:left-1/2 after:-ml-1 after:-translate-y-1/2 after:w-2 after:h-2 after:bg-gray-d2 after:dark:bg-white after:rotate-45"
      style={{
        top: `${Math.floor(top)}px`,
        left: `${Math.floor(left)}px`,
      }}
    >
      {content}
    </Transition>,
    document.body
  );
}
