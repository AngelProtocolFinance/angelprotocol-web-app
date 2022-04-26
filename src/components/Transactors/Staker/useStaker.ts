import { useCallback } from "react";
import { useSetModal } from "components/Modal/Modal";
import Transactor, { TxProps } from "../Transactor";
import StakeForm from "./StakeForm";
import Staker from "./Staker";
import { Props } from "./types";

export default function useStaker() {
  const { showModal } = useSetModal();
  const showStaker = useCallback(
    (is_stake: boolean) => () => {
      showModal<TxProps<Props>>(Transactor, {
        inModal: true,
        Content: Staker,
        contentProps: { Form: StakeForm, stake: is_stake },
      });
    },
    //eslint-disable-next-line
    []
  );
  return showStaker;
}
