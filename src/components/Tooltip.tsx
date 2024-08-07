import { Transition } from "@headlessui/react";
import { useEffect, useState } from "react";
import type { RefObject } from "react";
import { createPortal } from "react-dom";

type Props<T extends HTMLElement> = {
  content: string;
  anchorRef?: RefObject<T>;
};

export default function Tooltip<T extends HTMLElement>({
  content,
  anchorRef,
}: Props<T>) {
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const [isHovered, setHovered] = useState(false);

  useEffect(() => {
    const element = anchorRef?.current;
    if (!element) return;

    function handleMouseEnter(this: HTMLElement) {
      const rect = this.getBoundingClientRect();
      setTop(rect.top);
      setLeft(rect.left);
      setHovered(true);
    }

    function handleMouseLeave(this: HTMLElement) {
      setHovered(false);
    }

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [anchorRef]);

  return createPortal(
    <Transition
      as="div"
      show={isHovered}
      enter="transition-opacity duration-500"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className="fixed -translate-x-1/2 -translate-y-full -mt-2 ml-2.5 z-50 flex items-center justify-center px-3 py-2 rounded bg-gray-d2 dark:bg-white font-normal text-sm w-max max-w-[200px] text-white dark:text-navy-d4 after:content-[''] after:absolute after:top-full after:left-1/2 after:-ml-1 after:-translate-y-1/2 after:w-2 after:h-2 after:bg-gray-d2 after:dark:bg-white after:rotate-45"
      // had to move top+left position calculations to the props.style as the expected behavior wasn't there when setting these values
      // in className using tailwind
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
