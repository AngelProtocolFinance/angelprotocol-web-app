import { useFormContext } from "react-hook-form";
import { HaloStakingValues } from "./types";
import { apesTags, customTags, invalidateApesTags } from "services/apes";
import { invalidateJunoTags } from "services/juno";
import { govTags, junoTags } from "services/juno/tags";
import { useChain } from "contexts/ChainGuard";
import { useSetter } from "store/accessors";
import { sendCosmosTx } from "slices/transaction/transactors";
import Gov from "contracts/Gov";

export default function useStakeUnstake() {
  const {
    getValues,
    handleSubmit,
    formState: { isValid, isDirty, isSubmitting },
  } = useFormContext<HaloStakingValues>();
  const chain = useChain();
  const dispatch = useSetter();

  function stakeOrUnstake(data: HaloStakingValues) {
    const contract = new Gov(chain);
    const govMsg = getValues("is_stake")
      ? contract.createGovStakeMsg(data.amount)
      : contract.createGovUnstakeMsg(+data.amount);
    dispatch(
      sendCosmosTx({
        chain,
        msgs: [govMsg],
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
    stakeOrUnstake: handleSubmit(stakeOrUnstake),
    isSubmitDisabled: !isValid || !isDirty || isSubmitting,
  };
}
