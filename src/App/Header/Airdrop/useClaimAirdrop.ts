import Decimal from "decimal.js";
import { useMemo } from "react";
import { Airdrops } from "types/aws";
import { invalidateJunoTags } from "services/juno";
import { govTags } from "services/juno/tags";
import { useGetWallet } from "contexts/WalletContext";
import Airdrop from "contracts/Airdrop";
import useTxSender from "hooks/useTxSender";
import { condense } from "helpers";

export default function useClaimAirdrop(airdrops: Airdrops) {
  const { wallet } = useGetWallet();
  const { sendTx, isSending } = useTxSender(true);

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
      content: { type: "cosmos", val: claimAirdropMsgs },
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
