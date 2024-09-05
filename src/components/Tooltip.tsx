import { type ReactNode, useState } from "react";

import { Portal, Provider, Root, Trigger } from "@radix-ui/react-tooltip";
export { Content, Arrow } from "@radix-ui/react-tooltip";

interface Props {
  /** must be wrapped by Content */
  children: ReactNode;
  trigger: ReactNode;
}
export function Tooltip(props: Props) {
  const [open, setOpen] = useState(false);
  return (
    <Provider>
      <Root delayDuration={50} open={open} onOpenChange={setOpen}>
        <div onClick={() => setOpen(true)} className="contents">
          <Trigger asChild>{props.trigger}</Trigger>
          <Portal>{props.children}</Portal>
        </div>
      </Root>
    </Provider>
  );
}
