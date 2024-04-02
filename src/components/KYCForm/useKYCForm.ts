import { useModalContext } from "contexts/ModalContext";
import KYCForm from "./KYCForm";
import { Props } from "./types";

export function useKYCForm() {
  const { showModal } = useModalContext();
  return (props: Props) => {
    showModal(KYCForm, props);
  };
}
