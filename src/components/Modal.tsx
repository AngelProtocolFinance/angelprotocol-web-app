import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import type { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  classes?: string;
  open: boolean;
  onClose: () => void;
}
export function Modal(props: Props) {
  return (
    <Dialog open={props.open} onClose={props.onClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30 data-[closed]:opacity-0" />
      <DialogPanel className={props.classes}>{props.children}</DialogPanel>
    </Dialog>
  );
}
