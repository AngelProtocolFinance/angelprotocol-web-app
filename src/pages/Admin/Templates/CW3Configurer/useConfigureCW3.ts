import { useParams } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import { EndowmentAddrParams } from "pages/EndowmentAdmin/types";
import { sendTerraTx } from "services/transaction/sendTerraTx";
import { terra } from "services/terra/terra";
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
import { useCW3ConfigState } from "services/terra/admin/states";

export default function useConfigureCW3() {
  const { wallet } = useWalletContext();
  const {
    handleSubmit,
    formState: { isSubmitting, isDirty, isValid },
  } = useFormContext<CW3ConfigValues>();
  const { showModal } = useSetModal();
  const dispatch = useSetter();

  const { address: endowmentAddr } = useParams<EndowmentAddrParams>();
  const { cwContracts } = useGetter((state) => state.admin.cwContracts);
  const { cw3ConfigState, isError } = useCW3ConfigState();

  async function configureCW3({
    title,
    description,
    ...nextConfig
  }: CW3ConfigValues) {
    const prevConfig: CW3ConfigPayload = {
      //submit is disabled if cw3Config is undefined
      threshold:
        +cw3ConfigState!.threshold.absolute_percentage.percentage * 100,
      height: cw3ConfigState!.max_voting_period.height,
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
