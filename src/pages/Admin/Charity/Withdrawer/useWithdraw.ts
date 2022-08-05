import { useFormContext } from "react-hook-form";
import { WithdrawValues } from "./types";
import { useAdminResources } from "pages/Admin/Guard";
import { invalidateJunoTags } from "services/juno";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import { useGetter, useSetter } from "store/accessors";
import { sendCosmosTx } from "slices/transaction/transactors";

export default function useWithdraw() {
  const { form_loading, form_error } = useGetter((state) => state.transaction);
  const {
    handleSubmit,
    formState: { isValid, isDirty, isSubmitting },
  } = useFormContext<WithdrawValues>();
  const { wallet } = useGetWallet();
  const { proposalLink } = useAdminResources();
  const dispatch = useSetter();

  function withdraw(data: WithdrawValues) {
    dispatch(
      sendCosmosTx({
        wallet,
        msgs: [],
        tagPayloads: [
          invalidateJunoTags([
            /**TODO: invalidate balance query */
          ]),
        ],
        successLink: proposalLink,
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
