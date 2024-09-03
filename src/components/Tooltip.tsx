import type { ReactNode } from "react";

import {
  Portal,
  Root,
  TooltipProvider,
  Trigger,
} from "@radix-ui/react-tooltip";
export { Content, TooltipArrow as Arrow } from "@radix-ui/react-tooltip";

interface Props {
  /** must be wrapped by Content */
  children: ReactNode;
  trigger: ReactNode;
}
export function Tooltip(props: Props) {
  return (
    <TooltipProvider>
      <Root delayDuration={50}>
        <Trigger asChild>{props.trigger}</Trigger>
        <Portal>{props.children}</Portal>
      </Root>
    </TooltipProvider>
  );
}
