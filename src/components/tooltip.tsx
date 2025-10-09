import { type ReactNode, useState } from "react";

import { Portal, Provider, Root, Trigger } from "@radix-ui/react-tooltip";
export { Content, Arrow } from "@radix-ui/react-tooltip";

interface Props {
  /** must be wrapped by Content */
  tip: ReactNode;
  children: ReactNode;
}
export function Tooltip(props: Props) {
  const [open, set_open] = useState(false);
  return (
    <Provider>
      <Root delayDuration={50} open={open} onOpenChange={set_open}>
        <div onClick={() => set_open(true)} className="contents">
          <Trigger asChild>{props.children}</Trigger>
          <Portal>{props.tip}</Portal>
        </div>
      </Root>
    </Provider>
  );
}
