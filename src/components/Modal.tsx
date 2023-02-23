import { Dialog, Transition } from "@headlessui/react";
import React, { FC } from "react";

const Modal: FC<any> = (props) => (
  <Transition.Child
    as={React.Fragment}
    enter="transform ease-out duration-300"
    enterFrom="opacity-0"
    enterTo="opacity-100"
    leave="transform ease-in duration-300"
    leaveFrom="opacity-100"
    leaveTo="opacity-0"
  >
    <Dialog.Panel {...props}>{props.children}</Dialog.Panel>
  </Transition.Child>
);

export default Modal as typeof Dialog.Panel;
