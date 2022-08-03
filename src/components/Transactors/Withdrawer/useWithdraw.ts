import { useFormContext } from "react-hook-form";
import { WithdrawResource, WithdrawValues } from "./types";
import { invalidateJunoTags } from "services/juno";
import { junoTags, multicallTags } from "services/juno/tags";
import { useGetter, useSetter } from "store/accessors";
import { sendCosmosTx } from "slices/transaction/transactors";
import { adminRoutes, appRoutes, siteRoutes } from "constants/routes";
import useWithrawEstimator from "./useWithdrawEstimator";

export default function useWithdraw(resources: WithdrawResource) {
  const { form_loading, form_error } = useGetter((state) => state.transaction);
  const {
    handleSubmit,
    formState: { isValid, isDirty, isSubmitting },
  } = useFormContext<WithdrawValues>();

  const { tx, wallet } = useWithrawEstimator(resources);
  const dispatch = useSetter();

  function withdraw() {
    dispatch(
      sendCosmosTx({
        wallet,
        tx: tx!,
        tagPayloads: [
          invalidateJunoTags([
            { type: junoTags.multicall, id: multicallTags.endowmentBalance },
            { type: junoTags.multicall, id: multicallTags.junoBalances },
          ]),
        ],
        successLink: {
          url: `${appRoutes.endowment_admin}/${resources.accountAddr}/${adminRoutes.proposals}`,
          description: "Go to proposals",
        },
        successMessage: "Withdraw proposal successfully created!",
      })
    );
  }

  return {
    withdraw: handleSubmit(withdraw),
    isSubmitDisabled:
      !isValid ||
      !isDirty ||
      form_loading ||
      form_error !== null ||
      isSubmitting,
    isFormLoading: form_loading,
  };
}
