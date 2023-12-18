import { Props } from "./types";
import { useModalContext } from "contexts/ModalContext";
import Receipter from "./index";

export function useKYC() {
  const { showModal } = useModalContext();
  return (props: Props) => {
    showModal(Receipter, props);
  };
}
