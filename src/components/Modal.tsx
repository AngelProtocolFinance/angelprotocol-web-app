import { DialogPanel, DialogTitle, TransitionChild } from "@headlessui/react";
import React, { type FC } from "react";

const ModalFn: FC<any> = (props) => (
  <TransitionChild
    as={React.Fragment}
    enter="transform ease-out duration-300"
    enterFrom="opacity-0"
    enterTo="opacity-100"
    leave="transform ease-in duration-300"
    leaveFrom="opacity-100"
    leaveTo="opacity-0"
  >
    <DialogPanel {...props} />
  </TransitionChild>
);

const TitleFn: FC<any> = (props) => <DialogTitle {...props} />;

const ModalFnRoot = ModalFn as typeof DialogPanel;
const Title = TitleFn as typeof DialogTitle;

const Modal = Object.assign(ModalFnRoot, { Title });

export default Modal;
