import { apesTags, customTags, invalidateApesTags } from "services/apes";
import { invalidateJunoTags } from "services/juno";
import { govTags, junoTags } from "services/juno/tags";
import { useChainWallet } from "contexts/ChainGuard";
import { useSetter } from "store/accessors";
import { sendCosmosTx } from "slices/transaction/transactors";
import Gov from "contracts/Gov";

export default function useClaimUnstakedHalo() {
  const dispatch = useSetter();
  const wallet = useChainWallet();

  function claimUnstakedHalo() {
    const contract = new Gov(wallet);
    const claimMsg = contract.createGovClaimMsg();

    dispatch(
      sendCosmosTx({
        wallet,
        msgs: [claimMsg],
        tagPayloads: [
          invalidateJunoTags([
            { type: junoTags.gov, id: govTags.staker },
            { type: junoTags.gov, id: govTags.halo_balance },
          ]),
          invalidateApesTags([{ type: apesTags.custom, id: customTags.chain }]),
        ],
      })
    );
  }

  return {
    claimUnstakedHalo,
  };
}
