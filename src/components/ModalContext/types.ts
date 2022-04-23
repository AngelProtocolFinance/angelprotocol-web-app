import { FC, ReactNode } from "react";

export type Handler = () => void;
export type Opener = <T = {}>(
  Content: FC<T>,
  props: T & { isDismissDisabled?: false }
) => void;
export type Handlers = {
  showModal: Opener;
  closeModal: Handler;
};
export interface Props {
  backdropClasses: string;
  children: ReactNode;
}
