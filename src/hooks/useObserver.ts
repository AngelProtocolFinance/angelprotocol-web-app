import { useEffect, useRef, useState } from "react";

export default function useObserve(options: IntersectionObserverInit) {
  const targetRef = useRef<HTMLDivElement>(null);
  const [update, forceUpdate] = useState<number>(0);
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const { current: target } = targetRef;

  useEffect(() => {
    if (!target) {
      forceUpdate(Math.random());
      return;
    }

    if (!window.IntersectionObserver) {
      return;
    }
    const observer = new IntersectionObserver(function (entries) {
      //this call will run once observer has target
      !entry && setEntry(entries[0]);
    }, options);

    observer.observe(target);

    return () => observer.disconnect();
    //before next run of useEffect, disconnect existing observer
    // eslint-disable-next-line
  }, [update]);

  return { ref: targetRef, isVisible: !!entry?.isIntersecting };
}
