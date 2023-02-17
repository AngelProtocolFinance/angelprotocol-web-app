import Popup from "@/components/Popup";
import { useModalContext } from "@/contexts/ModalContext";
import useCosmosTxSender from "@/hooks/useCosmosTxSender";
import { useAdminResources } from "@/pages/Admin/Guard";
import { useGetWallet } from "@ap/contexts/wallet-context";
import { CW3Review } from "@ap/contracts";
import { genDiffMeta, getPayloadDiff, getTagPayloads } from "@ap/helpers";
import { useFormContext } from "react-hook-form";
import {
  CW3ConfigValues,
  FormReviewCW3Config,
  ReviewCW3ConfigUpdateMeta,
} from "@/pages/Admin/types";

type Key = keyof FormReviewCW3Config;
type Value = FormReviewCW3Config[Key];

export default function useCreateProposal() {
  const { propMeta } = useAdminResources();
  const { wallet } = useGetWallet();
  const {
    getValues,
    handleSubmit,
    formState: { isSubmitting, isDirty, isValid },
  } = useFormContext<CW3ConfigValues<FormReviewCW3Config>>();
  const { showModal } = useModalContext();
  const sendTx = useCosmosTxSender();

  async function createProposal({
    title,
    description,
    initial,
    isTime,
    new_endow_gas_money,
    seed_asset,
    ...newData
  }: CW3ConfigValues<FormReviewCW3Config>) {
    const diff = getPayloadDiff(initial, newData);
    const diffEntries = Object.entries(diff) as [Key, Value][];

    if (diffEntries.length <= 0) {
      showModal(Popup, { message: "no changes made" });
      return;
    }

    const contract = new CW3Review(wallet);

    const configUpdateMsg = contract.createEmbeddedUpdateConfigMsg({
      threshold: {
        absolute_percentage: {
          percentage: `${newData.threshold / 100}`,
        },
      },
      max_voting_period: isTime
        ? { time: newData.duration }
        : { height: newData.duration },
      require_execution: newData.require_execution,
      seed_split_to_liquid: newData.seed_split_to_liquid,
      new_endow_gas_money,
      seed_asset,
    });

    const configUpdateMeta: ReviewCW3ConfigUpdateMeta = {
      type: "review_cw3_config",
      data: genDiffMeta(diffEntries, initial),
    };

    //proposal meta for preview
    const proposalMsg = contract.createProposalMsg(
      title,
      description,
      [configUpdateMsg],
      JSON.stringify(configUpdateMeta)
    );

    await sendTx({
      msgs: [proposalMsg],
      ...propMeta,
      tagPayloads: getTagPayloads(propMeta.willExecute && "review_cw3_config"),
    });
  }

  return {
    isTime: getValues("isTime"),
    createProposal: handleSubmit(createProposal),
    isSubmitDisabled: isSubmitting || !isValid || !isDirty,
  };
}
