import React, { ReactNode } from "react";

export type Handler = () => void;
export type Opener = <T = {}>(Content: React.FC<T>, props: T) => void;
export type Handlers = {
  showModal: Opener;
  hideModal: Handler;
};
export interface Props {
  classes: string;
  children: ReactNode;
}
