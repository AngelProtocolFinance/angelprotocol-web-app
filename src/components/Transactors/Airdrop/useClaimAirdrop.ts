import { useMemo } from "react";
import { Dec } from "@terra-money/terra.js";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { useSetModal } from "components/Modal/Modal";
import { Airdrops } from "services/aws/airdrop/types";
import { sendTerraTx } from "services/transaction/transactors/sendTerraTx";
import { terra } from "services/terra/terra";
import { gov, tags, user } from "services/terra/tags";
import { tags as awsTags } from "services/aws/tags";
import { aws } from "services/aws/aws";
import { useSetter } from "store/accessors";
import Halo from "contracts/Halo";

export default function useClaimAirdrop(airdrops: Airdrops) {
  const { showModal } = useSetModal();
  const wallet = useConnectedWallet();
  const dispatch = useSetter();

  const totalClaimable = useMemo(
    () =>
      airdrops.reduce(
        (result, airdrop) => new Dec(airdrop.haloTokens).div(1e6).add(result),
        new Dec(0)
      ),
    [airdrops]
  );

  const claimAirdrop = (isStake: boolean) => () => {
    const haloContract = new Halo(wallet);
    const claimAirdropMsgs = haloContract.createAirdropClaimMsg(
      airdrops,
      isStake
    );

    dispatch(
      sendTerraTx({
        wallet,
        msgs: claimAirdropMsgs,
        tagPayloads: [
          terra.util.invalidateTags([
            { type: tags.gov, id: gov.staker },
            { type: tags.gov, id: gov.halo_balance },
            { type: tags.user, id: user.halo_balance },
          ]),
          aws.util.invalidateTags([{ type: awsTags.airdrop }]),
        ],
      })
    );
    showModal(TransactionPrompt, {});
  };

  return { totalClaimable: totalClaimable.toNumber(), claimAirdrop };
}
