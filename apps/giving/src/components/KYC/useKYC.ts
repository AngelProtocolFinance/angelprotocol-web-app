import { useModalContext } from "@/contexts/ModalContext";
import { Props } from "./types";
import Receipter from "./index";

export default function useKYC() {
  const { showModal } = useModalContext();
  return (props: Props) => {
    showModal(Receipter, props);
  };
}
