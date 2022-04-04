import { useFormContext } from "react-hook-form";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { useSetModal } from "components/Modal/Modal";
import { sendTerraTx } from "services/transaction/sendTerraTx";
import { terra } from "services/terra/terra";
import { admin, tags } from "services/terra/tags";
import { useSetter } from "store/accessors";
import { proposalSuccessLink } from "../constants";
import { CW3ConfigValues } from "./cw3ConfigSchema";
import { useEffect } from "react";
import { useCW3Config } from "services/terra/admin/queriers";

export default function useConfigureCW3() {
  const wallet = useConnectedWallet();
  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting, isDirty, isValid },
  } = useFormContext<CW3ConfigValues>();
  const { showModal } = useSetModal();
  const dispatch = useSetter();

  const { cw3Config, isCW3ConfigLoading } = useCW3Config();
  useEffect(() => {
    if (isCW3ConfigLoading) return;
    if (!cw3Config) return;

    setValue("height", `${cw3Config.max_voting_period.height}`);
    setValue(
      "threshold",
      `${+cw3Config.threshold.absolute_percentage.percentage * 100}`
    );
  }, [cw3Config, isCW3ConfigLoading, setValue]);

  async function configureFund(data: CW3ConfigValues) {
    dispatch(
      sendTerraTx({
        msgs: [],
        wallet,
        tagPayloads: [
          terra.util.invalidateTags([
            { type: tags.admin, id: admin.proposals },
          ]),
        ],
        successLink: proposalSuccessLink,
        successMessage: "Config update proposal submitted",
      })
    );
    showModal(TransactionPrompt, {});
  }

  return {
    configureFund: handleSubmit(configureFund),
    isSubmitDisabled: isSubmitting || !isValid || !isDirty,
  };
}
