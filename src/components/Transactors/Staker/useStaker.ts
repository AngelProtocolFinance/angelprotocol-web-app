import { useCallback } from "react";
import { useModalContext } from "contexts/ModalContext";
import Transactor from "components/Transactor";
import Staker from ".";

export default function useStaker() {
  const { showModal } = useModalContext();
  const showStaker = useCallback(
    (is_stake: boolean) => () => {
      showModal(Transactor, {
        Content: Staker,
        contentProps: { isStake: is_stake },
      });
    },
    //eslint-disable-next-line
    []
  );
  return showStaker;
}
