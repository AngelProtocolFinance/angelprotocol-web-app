import { type ComponentProps, forwardRef } from "react";
import Wrapped from "react-fast-marquee";
import { ClientOnly } from "remix-utils/client-only";

export const Marquee = forwardRef<
  HTMLDivElement,
  ComponentProps<typeof Wrapped>
>((props, ref) => {
  return <ClientOnly>{() => <Wrapped {...props} ref={ref} />}</ClientOnly>;
});
