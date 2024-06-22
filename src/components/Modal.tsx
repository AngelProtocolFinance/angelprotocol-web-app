import {
  DialogPanel,
  type DialogPanelProps,
  DialogTitle,
} from "@headlessui/react";
import type { FC } from "react";

const ModalFn: FC<Omit<DialogPanelProps, "transition">> = ({
  className = "",
  ...props
}) => (
  <DialogPanel
    {...props}
    transition
    className={`${className} duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0`}
  />
);

const TitleFn: FC<any> = (props) => <DialogTitle {...props} />;

const ModalFnRoot = ModalFn as typeof DialogPanel;
const Title = TitleFn as typeof DialogTitle;

const Modal = Object.assign(ModalFnRoot, { Title });

export default Modal;
