import { useSetModal } from "components/Nodal/Nodal";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { chainIDs } from "contracts/types";
import { useAirdropQuery } from "services/aws/airdrop/airdrop";
import { useCallback } from "react";
import AirdropSuite, {
  AirdropProps,
} from "components/TransactionSuite/AirdropSuite";

export default function useAirdrop() {
  const wallet = useConnectedWallet();
  const { showModal } = useSetModal();

  const is_test = wallet?.network.chainID === chainIDs.testnet;
  const { data = [] } = useAirdropQuery(
    {
      wallet_addr: wallet?.walletAddress!,
      is_test: true,
    },
    { skip: !is_test || wallet?.walletAddress === undefined }
  );

  const showDetails = useCallback(() => {
    showModal<AirdropProps>(AirdropSuite, { airdrops: data });
    //eslint-disable-next-line
  }, [data]);

  return { airdrop_shown: !!wallet && data.length > 0, showDetails };
}
