import { useCallback } from "react";
import { useAirdrop as useAirdropQuery } from "services/terra/multicall/queriers";
import { useModalContext } from "components/ModalContext/ModalContext";
import Transactor, { TxProps } from "../Transactor";
import Catcher, { Props } from "./Catcher";

export default function useAirdrop() {
  const { showModal } = useModalContext();
  const { airdrops } = useAirdropQuery();

  const showDetails = useCallback(() => {
    showModal<TxProps<Props>>(Transactor, {
      inModal: true,
      Content: Catcher,
      contentProps: { airdrops },
    });
    //eslint-disable-next-line
  }, [airdrops]);

  return { airdrop_shown: airdrops.length > 0, showDetails };
}
