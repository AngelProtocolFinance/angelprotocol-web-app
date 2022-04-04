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

export default function useConfigureCW3() {
  const wallet = useConnectedWallet();
  const {
    handleSubmit,
    formState: { isSubmitting, isDirty, isValid },
  } = useFormContext<CW3ConfigValues>();
  const { showModal } = useSetModal();
  const dispatch = useSetter();

  //pre-fill fund config form
  // useEffect(() => {
  //   if (isIndexFundConfigLoading) return;
  //   if (!indexFundConfig) return;
  //   setValue("fund_member_limit", indexFundConfig.fund_member_limit);
  //   setValue("fund_rotation", indexFundConfig.fund_rotation);
  //   setValue(
  //     "funding_goal",
  //     indexFundConfig.funding_goal &&
  //       new Dec(indexFundConfig.funding_goal).div(1e6).toInt().toString()
  //   );
  // }, [indexFundConfig, isIndexFundConfigLoading, setValue]);

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
