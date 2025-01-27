import { type ReactNode, useState } from "react";

import { Portal, Provider, Root, Trigger } from "@radix-ui/react-tooltip";
export { Content, Arrow } from "@radix-ui/react-tooltip";

interface Props {
  /** must be wrapped by Content */
  tip: ReactNode;
  children: ReactNode;
}
export function Tooltip(props: Props) {
  const [open, setOpen] = useState(false);
  return (
    <Provider>
      <Root delayDuration={50} open={open} onOpenChange={setOpen}>
        <div onClick={() => setOpen(true)} className="contents">
          <Trigger asChild>{props.children}</Trigger>
          <Portal>{props.tip}</Portal>
        </div>
      </Root>
    </Provider>
  );
}
