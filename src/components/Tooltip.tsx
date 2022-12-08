import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { logger } from "helpers";

type Props = { anchorId: string; content: string };

export default function Tooltip({ anchorId, content }: Props) {
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  useEffect(() => {
    const anchor = document.getElementById(anchorId);
    if (!anchor) {
      return logger.error(`No element with ID '${anchorId}'`);
    }

    const pos = anchor.getBoundingClientRect();

    setTop(pos.top);
    setLeft(pos.left);
  }, [anchorId]);

  return createPortal(
    <Content top={top} left={left} text={content} />,
    document.body
  );
}

function Content({
  text,
  top,
  left,
}: {
  text: string;
  top: number;
  left: number;
}) {
  return (
    <span
      className={`absolute z-50 flex items-center justify-center px-3 py-2 rounded bg-gray-d2 dark:bg-white font-normal font-body text-sm w-max max-w-[200px] text-white dark:text-gray-d2 after:content-[''] after:absolute after:top-full after:left-1/2 after:-ml-2 after:-translate-y-1/2 after:w-2 after:h-2 after:bg-gray-d2 after:dark:bg-white after:rotate-45`}
      style={{ top: `${Math.floor(top)}px`, left: `${Math.floor(left)}px` }}
    >
      {text}
    </span>
  );
}
