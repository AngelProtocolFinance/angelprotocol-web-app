import { useFormContext } from "react-hook-form";
import { CreatePollValues } from "./types";
import { multicallTags, terraTags } from "services/terra/tags";
import { terra } from "services/terra/terra";
import { useGetter, useSetter } from "store/accessors";
import { sendTerraTx } from "slices/transaction/transactors/sendTerraTx";
import { createGovContract } from "contracts/createGovContract";
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
    const contract = await createGovContract(wallet);
    const { amount, title, description, link } = data;
    const pollMsg = contract.createPollMsgs(+amount, title, description, link);

    dispatch(
      sendTerraTx({
        wallet,
        tx: { msgs: [pollMsg], fee: maxFee },
        tagPayloads: [
          terra.util.invalidateTags([
            { type: terraTags.gov },
            { type: terraTags.multicall, id: multicallTags.terraBalances },
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
