import { Props } from "./types";
import { useModalContext } from "contexts/ModalContext";
import KYCForm from "./KYCForm";

export function useKYCForm() {
  const { showModal } = useModalContext();
  return (props: Props) => {
    showModal(KYCForm, props);
  };
}
