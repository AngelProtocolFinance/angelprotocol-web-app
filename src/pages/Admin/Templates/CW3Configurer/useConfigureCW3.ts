import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import { EndowmentAddrParams } from "pages/EndowmentAdmin/types";
import { sendTerraTx } from "services/transaction/sendTerraTx";
import { terra } from "services/terra/terra";
import { useCW3Config } from "services/terra/admin/queriers";
import { admin, tags } from "services/terra/tags";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { useSetModal } from "components/Modal/Modal";
import Popup from "components/Popup/Popup";
import { useGetter, useSetter } from "store/accessors";
import getPayloadDiff from "helpers/getPayloadDiff";
import Admin from "contracts/Admin";
import genProposalsLink from "../genProposalsLink";
import { CW3ConfigPayload, CW3ConfigValues } from "./cw3ConfigSchema";
import { ProposalMeta } from "pages/Admin/types";
import useWalletContext from "hooks/useWalletContext";
import { proposalTypes } from "constants/routes";

export default function useConfigureCW3() {
  const { wallet } = useWalletContext();
  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting, isDirty, isValid },
  } = useFormContext<CW3ConfigValues>();
  const { showModal } = useSetModal();
  const dispatch = useSetter();

  const { address: endowmentAddr } = useParams<EndowmentAddrParams>();
  const { cwContracts } = useGetter((state) => state.admin.cwContracts);
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
    //eslint-disable-next-line
  }, [cw3Config, isCW3ConfigLoading, isError, setValue]);

  async function configureCW3({
    title,
    description,
    ...nextConfig
  }: CW3ConfigValues) {
    const prevConfig: CW3ConfigPayload = {
      //submit is disabled if cw3Config is undefined
      threshold: +cw3Config!.threshold.absolute_percentage.percentage * 100,
      height: cw3Config!.max_voting_period.height,
    };
    const diff = getPayloadDiff(prevConfig, nextConfig);

    if (Object.entries(diff).length <= 0) {
      showModal(Popup, { message: "no changes made" });
      return;
    }

    const adminContract = new Admin(cwContracts, wallet);
    const configUpdateMsg = adminContract.createEmbeddedUpdateConfigMsg(
      nextConfig.height,
      (nextConfig.threshold / 100).toFixed(3)
    );

    const configUpdateMeta: ProposalMeta = {
      type: proposalTypes.adminGroup_updateCW3Config,
      data: { prevConfig, nextConfig },
    };

    //proposal meta for preview
    const proposalMsg = adminContract.createProposalMsg(
      title,
      description,
      [configUpdateMsg],
      JSON.stringify(configUpdateMeta)
    );

    dispatch(
      sendTerraTx({
        msgs: [proposalMsg],
        wallet,
        tagPayloads: [
          terra.util.invalidateTags([
            { type: tags.admin, id: admin.proposals },
          ]),
        ],
        successLink: genProposalsLink(cwContracts, endowmentAddr),
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
