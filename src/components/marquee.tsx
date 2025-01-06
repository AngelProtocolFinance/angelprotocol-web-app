import { type ComponentProps, Suspense, forwardRef, lazy } from "react";
const Component = lazy(() => import("react-fast-marquee"));

export const Marquee = forwardRef<
  HTMLDivElement,
  ComponentProps<typeof Component>
>((props, ref) => {
  return (
    <Suspense>
      <Component {...props} ref={ref} />
    </Suspense>
  );
});
