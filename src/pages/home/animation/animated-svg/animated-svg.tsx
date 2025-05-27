import { ClientOnly } from "remix-utils/client-only";
import { AnimatedSVG as AnimatedSVGClient } from "./animated-svg.client";

interface AnimatedSVGProps {
  classes?: string;
}

export function AnimatedSVG(props: AnimatedSVGProps) {
  return (
    <ClientOnly
      fallback={<div className={`${props.classes || ""} h-screen`} />}
    >
      {() => <AnimatedSVGClient {...props} />}
    </ClientOnly>
  );
}
