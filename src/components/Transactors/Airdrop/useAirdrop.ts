import { useSetModal } from "components/Modal/Modal";
import { chainIDs } from "constants/chainIDs";
import useWalletContext from "hooks/useWalletContext";
import { useCallback } from "react";
import { useAirdropQuery } from "services/aws/airdrop/airdrop";
import Transactor, { TxProps } from "../Transactor";
import Catcher, { Props } from "./Catcher";

export default function useAirdrop() {
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

  const showDetails = useCallback(() => {
    showModal<TxProps<Props>>(Transactor, {
      inModal: true,
      Content: Catcher,
      contentProps: { airdrops: data },
    });
    //eslint-disable-next-line
  }, [data]);

  return { airdrop_shown: !!wallet && data.length > 0, showDetails };
}
