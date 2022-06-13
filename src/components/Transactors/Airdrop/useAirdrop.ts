import { useCallback } from "react";
import { useAirdrop as useAirdropQuery } from "services/terra/multicall/queriers";
import { useModalContext } from "components/ModalContext/ModalContext";
import Transactor, { TxProps } from "../Transactor";
import Catcher, { Props } from "./Catcher";

export default function useAirdrop() {
<<<<<<< HEAD
  const { showModal } = useModalContext();
  const { airdrops } = useAirdropQuery();
=======
  const { wallet } = useWalletContext();
  const { showModal } = useSetModal();

  const is_test = wallet?.network.chainID === chainIDs.terra_test;
  const { data = [] } = useAirdropQuery(
    {
      wallet_addr: wallet?.address!,
      is_test,
    },
    { skip: wallet?.address === undefined }
  );
>>>>>>> master

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
