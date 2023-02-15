import { ReactNode, useCallback, useState } from "react";

type Props = {
  options: IntersectionObserverInit;
  children(isVisible: boolean): ReactNode;
};

export default function Observer({ options, children }: Props) {
  const [entries, setEntries] = useState<IntersectionObserverEntry[]>([]);

  const divRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node || !window.IntersectionObserver) return;
      const observer = new IntersectionObserver(function (entries) {
        setEntries(entries);
      }, options);

      observer.observe(node);
    },
    [options]
  );

  return <div ref={divRef}>{children(!!entries[0]?.isIntersecting)}</div>;
}
