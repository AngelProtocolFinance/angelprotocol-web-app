import { Props } from "./types";
import { useModalContext } from "contexts/ModalContext";
import Transactor, { TxProps } from "components/Transactor";
import Voter from ".";

export default function useAdminVoter(props: Props) {
  const { showModal } = useModalContext();
  const showVoter = () => {
    showModal<TxProps<Props>>(Transactor, {
      Content: Voter,
      contentProps: props,
    });
  };
  return showVoter;
}
