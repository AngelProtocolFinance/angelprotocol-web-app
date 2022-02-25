import { useSetModal } from "components/Modal/Modal";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { chainIDs } from "constants/chainIDs";
import { useAirdropQuery } from "services/aws/airdrop/airdrop";
import { useCallback } from "react";
import Catcher, { Props } from "./Catcher";
import Transactor, { TxProps } from "../Transactor";

export default function useAirdrop() {
  const wallet = useConnectedWallet();
  const { showModal } = useSetModal();

  const is_test = wallet?.network.chainID === chainIDs.testnet;
  const { data = [] } = useAirdropQuery(
    {
      wallet_addr: wallet?.walletAddress!,
      is_test,
    },
    { skip: wallet?.walletAddress === undefined }
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
