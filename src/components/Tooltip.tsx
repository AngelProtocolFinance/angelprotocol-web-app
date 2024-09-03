import type { ReactNode } from "react";

import {
  Portal,
  Root,
  TooltipProvider,
  Trigger,
} from "@radix-ui/react-tooltip";
export { Content, TooltipArrow as Arrow } from "@radix-ui/react-tooltip";

interface Props {
  children: ReactNode;
  /** must be wrapped by Content */
  content: ReactNode;
}
export function Tooltip(props: Props) {
  return (
    <TooltipProvider>
      <Root delayDuration={50}>
        <Trigger asChild>{props.children}</Trigger>
        <Portal>{props.content}</Portal>
      </Root>
    </TooltipProvider>
  );
}
