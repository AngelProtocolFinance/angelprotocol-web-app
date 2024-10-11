import type { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  classes?: string;
}
export function Container({ classes = "", children }: Props) {
  return (
    <header
      className={classes}
      ref={(node) => {
        if (!node) return;
        const observer = new IntersectionObserver(
          ([e]) => {
            const isIntersecting = e.intersectionRatio < 1;
            e.target.classList.toggle("bg-white", isIntersecting);
            e.target.classList.toggle("shadow-lg", isIntersecting);
            e.target.classList.toggle("px-4", !isIntersecting);
          },
          { threshold: [1] }
        );
        observer.observe(node);
      }}
    >
      {children}
    </header>
  );
}
