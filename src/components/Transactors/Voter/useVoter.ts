import { useCallback } from "react";
import { useModalContext } from "components/ModalContext/ModalContext";
import Voter from "./Voter";
import VoterForm from "./VoterForm";
import { Props } from "./types";
import Transactor, { TxProps } from "../Transactor";

export default function useVoter(poll_id: number) {
  const { showModal } = useModalContext();
  const showVoter = useCallback(() => {
    showModal<TxProps<Props>>(Transactor, {
      inModal: true,
      Content: Voter,
      contentProps: { Form: VoterForm, poll_id },
    });
    //eslint-disable-next-line
  }, [poll_id]);

  return showVoter;
}
