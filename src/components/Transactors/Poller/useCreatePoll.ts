import { useFormContext } from "react-hook-form";
import { CreatePollValues } from "./types";
import { apesTags, customTags, invalidateApesTags } from "services/apes";
import { invalidateJunoTags } from "services/juno";
import { junoTags } from "services/juno/tags";
import { useChain } from "contexts/ChainGuard";
import { useSetter } from "store/accessors";
import { sendCosmosTx } from "slices/transaction/transactors";
import Gov from "contracts/Gov";

export default function useCreatePoll() {
  const {
    handleSubmit,
    formState: { isValid, isDirty, isSubmitting },
  } = useFormContext<CreatePollValues>();
  const chain = useChain();
  const dispatch = useSetter();

  async function createPoll(data: CreatePollValues) {
    const contract = new Gov(chain);
    const { amount, title, description, link } = data;
    const pollMsg = contract.createPollMsgs(+amount, title, description, link);

    dispatch(
      sendCosmosTx({
        chain,
        msgs: [pollMsg],
        tagPayloads: [
          invalidateJunoTags([{ type: junoTags.gov }]),
          invalidateApesTags([{ type: apesTags.custom, id: customTags.chain }]),
        ],
      })
    );
  }
  return {
    createPoll: handleSubmit(createPoll),
    isSubmitDisabled: !isValid || !isDirty || isSubmitting,
  };
}
