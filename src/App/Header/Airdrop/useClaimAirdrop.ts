import Decimal from "decimal.js";
import { useMemo } from "react";
import { Airdrops } from "types/aws";
import { invalidateJunoTags } from "services/juno";
import { govTags, junoTags } from "services/juno/tags";
import { useGetWallet } from "contexts/WalletContext";
import Airdrop from "contracts/Airdrop";
import useCosmosTxSender from "hooks/useCosmosTxSender";
import { condense } from "helpers";

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
          { type: junoTags.gov, id: govTags.staker },
          { type: junoTags.gov, id: govTags.halo_balance },
        ]),
      ],
    });
  };

  return { totalClaimable: totalClaimable.toNumber(), claimAirdrop, isSending };
}
