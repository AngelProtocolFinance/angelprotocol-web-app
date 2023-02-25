import { useGetWallet } from "@giving/contexts/wallet-context";
import { condense } from "@giving/helpers";
import useCosmosTxSender from "@giving/hooks/useCosmosTxSender";
import { invalidateJunoTags } from "@giving/services/juno";
import { govTags } from "@giving/services/juno/tags";
import Decimal from "decimal.js";
import { useMemo } from "react";
import { Airdrops } from "@giving/types/aws";
import Airdrop from "contracts/Airdrop";

export default function useClaimAirdrop(airdrops: Airdrops) {
  const { wallet } = useGetWallet();
  const { sendTx, isSending } = useCosmosTxSender(true);

  const totalClaimable = useMemo(
    () =>
      airdrops.reduce(
        (result, airdrop) => condense(airdrop.haloTokens).add(result),
        new Decimal(0)
      ),
    [airdrops]
  );

  const claimAirdrop = (isStake: boolean) => async () => {
    const airdropContract = new Airdrop(wallet);
    const claimAirdropMsgs = airdropContract.createAirdropClaimMsg(
      airdrops,
      isStake
    );

    await sendTx({
      msgs: claimAirdropMsgs,
      tagPayloads: [
        invalidateJunoTags([
          { type: "gov", id: govTags.staker },
          { type: "gov", id: govTags.halo_balance },
        ]),
      ],
    });
  };

  return { totalClaimable: totalClaimable.toNumber(), claimAirdrop, isSending };
}
