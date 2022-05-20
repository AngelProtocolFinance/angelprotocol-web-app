import { FC } from "react";

export type Handler = () => void;
export type Opener = <T = {}>(
  Content: FC<T>,
  props: T & { isDismissDisabled?: false }
) => void;
export type Handlers = {
  showModal: Opener;
  closeModal: Handler;
};

export { useModalContext, ModalContext as default } from "./ModalContext";
