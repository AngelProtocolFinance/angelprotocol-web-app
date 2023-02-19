import { useModalContext } from "@ap/contexts";
import { Props } from "./types";
import Receipter from "./KYC";

export default function useKYC() {
  const { showModal } = useModalContext();
  return (props: Props) => {
    showModal(Receipter, props);
  };
}
