import type { ReactNode } from "react";

import { Portal, Provider, Root, Trigger } from "@radix-ui/react-tooltip";
export { Content, Arrow } from "@radix-ui/react-tooltip";

interface Props {
  /** must be wrapped by Content */
  children: ReactNode;
  trigger: ReactNode;
}
export function Tooltip(props: Props) {
  return (
    <Provider>
      <Root delayDuration={50}>
        <Trigger asChild>{props.trigger}</Trigger>
        <Portal>{props.children}</Portal>
      </Root>
    </Provider>
  );
}
