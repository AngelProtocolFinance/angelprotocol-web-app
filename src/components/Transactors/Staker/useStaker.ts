import { useCallback } from "react";
import { Props } from "./types";
import { useModalContext } from "contexts/ModalContext";
import Transactor, { TxProps } from "components/Transactor";
import Staker from "./Staker";

export default function useStaker() {
  const { showModal } = useModalContext();
  const showStaker = useCallback(
    (is_stake: boolean) => () => {
      showModal<TxProps<Props>>(Transactor, {
        inModal: true,
        Content: Staker,
        contentProps: { isStake: is_stake },
      });
    },
    //eslint-disable-next-line
    []
  );
  return showStaker;
}
