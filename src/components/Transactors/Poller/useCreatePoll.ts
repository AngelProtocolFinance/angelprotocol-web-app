import { useFormContext } from "react-hook-form";
import { CreatePollValues } from "./types";
import { invalidateJunoTags } from "services/juno";
import { junoTags, multicallTags } from "services/juno/tags";
import { useGetter, useSetter } from "store/accessors";
import { sendCosmosTx } from "slices/transaction/transactors";
import Gov from "contracts/Gov";
import useCreatePollEstimate from "./useCreatePollEstimate";

export default function useCreatePoll() {
  const {
    handleSubmit,
    formState: { isValid, isDirty, isSubmitting },
  } = useFormContext<CreatePollValues>();

  const { form_error, form_loading } = useGetter((state) => state.transaction);
  const { maxFee, wallet } = useCreatePollEstimate();
  const dispatch = useSetter();

  async function createPoll(data: CreatePollValues) {
    const contract = new Gov(wallet);
    const { amount, title, description, link } = data;
    const pollMsg = contract.createPollMsgs(+amount, title, description, link);

    dispatch(
      sendCosmosTx({
        wallet,
        tx: { msgs: [pollMsg], fee: maxFee! },
        tagPayloads: [
          invalidateJunoTags([
            { type: junoTags.gov },
            { type: junoTags.multicall, id: multicallTags.junoBalances },
          ]),
        ],
      })
    );
  }

  return {
    createPoll: handleSubmit(createPoll),
    isSubmitDisabled:
      !isValid ||
      !isDirty ||
      form_error !== null ||
      form_loading ||
      isSubmitting,
    isFormLoading: form_loading,
  };
}
