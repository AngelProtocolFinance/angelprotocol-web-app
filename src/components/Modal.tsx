import { Dialog, Transition } from "@headlessui/react";
import React, { type FC } from "react";

const ModalFn: FC<any> = (props) => (
  <Transition.Child
    as={React.Fragment}
    enter="transform ease-out duration-300"
    enterFrom="opacity-0"
    enterTo="opacity-100"
    leave="transform ease-in duration-300"
    leaveFrom="opacity-100"
    leaveTo="opacity-0"
  >
    <Dialog.Panel {...props} />
  </Transition.Child>
);

const TitleFn: FC<any> = (props) => <Dialog.Title {...props} />;

const ModalFnRoot = ModalFn as typeof Dialog.Panel;
const Title = TitleFn as typeof Dialog.Title;

const Modal = Object.assign(ModalFnRoot, { Title });

export default Modal;
