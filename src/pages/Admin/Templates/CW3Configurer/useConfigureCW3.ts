import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { sendTerraTx } from "services/transaction/sendTerraTx";
import { terra } from "services/terra/terra";
import { useCW3Config } from "services/terra/admin/queriers";
import { admin, tags } from "services/terra/tags";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { useSetModal } from "components/Modal/Modal";
import Popup from "components/Popup/Popup";
import { useSetter } from "store/accessors";
import getPayloadDiff from "helpers/getPayloadDiff";
import Admin from "contracts/Admin";
import { proposalSuccessLink } from "../constants";
import { CW3ConfigValues } from "./cw3ConfigSchema";

export default function useConfigureCW3() {
  const wallet = useConnectedWallet();
  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting, isDirty, isValid },
  } = useFormContext<CW3ConfigValues>();
  const { showModal } = useSetModal();
  const dispatch = useSetter();

  const { cw3Config, isCW3ConfigLoading, isError } = useCW3Config();

  //init form values
  useEffect(() => {
    if (isCW3ConfigLoading) return;
    if (!cw3Config) return;

    if (isError) {
      showModal(Popup, { message: "failed to load config" });
      return;
    }

    setValue("height", cw3Config.max_voting_period.height);
    setValue(
      "threshold",
      +cw3Config.threshold.absolute_percentage.percentage * 100
    );
  }, [cw3Config, isCW3ConfigLoading, isError, setValue]);

  async function configureCW3({
    title,
    description,
    ...nextConfig
  }: CW3ConfigValues) {
    const prevConfig: Omit<CW3ConfigValues, "title" | "description"> = {
      //submit is disabled if cw3Config is undefined
      threshold: +cw3Config!.threshold.absolute_percentage,
      height: cw3Config!.max_voting_period.height,
    };
    const diff = getPayloadDiff(prevConfig, nextConfig);

    if (Object.entries(diff).length <= 0) {
      showModal(Popup, { message: "no changes made" });
      return;
    }

    const adminContract = new Admin("apTeam", wallet);
    const configUpdateMsg = adminContract.createEmbeddedUpdateConfigMsg(
      nextConfig.height,
      (nextConfig.threshold / 100).toFixed(3)
    );
    const proposalMsg = adminContract.createProposalMsg(title, description, [
      configUpdateMsg,
    ]);

    dispatch(
      sendTerraTx({
        msgs: [proposalMsg],
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
    configureCW3: handleSubmit(configureCW3),
    isSubmitDisabled: isSubmitting || !isValid || !isDirty || isError,
  };
}
