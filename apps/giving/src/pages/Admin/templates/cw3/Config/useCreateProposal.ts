import Prompt from "@giving/components/prompt";
import { useModalContext } from "@giving/contexts/modal-context";
import { useGetWallet } from "@giving/contexts/wallet-context";
import {
  genDiffMeta,
  getPayloadDiff,
  getTagPayloads,
} from "@giving/helpers/admin";
import useCosmosTxSender from "@giving/hooks/useCosmosTxSender/useCosmosTxSender";
import { useFormContext } from "react-hook-form";
import {
  CW3ConfigUpdateMeta,
  CW3ConfigValues,
  FormCW3Config,
} from "@giving/types/pages/admin";
import { useAdminResources } from "pages/Admin/Guard";
import CW3 from "contracts/CW3";

type Key = keyof FormCW3Config;
type Value = FormCW3Config[Key];

export default function usePropose() {
  const { cw3, propMeta } = useAdminResources();
  const { wallet } = useGetWallet();
  const {
    getValues,
    handleSubmit,
    formState: { isSubmitting, isDirty, isValid },
  } = useFormContext<CW3ConfigValues<FormCW3Config>>();
  const { showModal } = useModalContext();
  const sendTx = useCosmosTxSender();

  async function createProposal({
    title,
    description,
    initial,
    isTime,
    ...newData
  }: CW3ConfigValues<FormCW3Config>) {
    const diff = getPayloadDiff(initial, newData);
    const diffEntries = Object.entries(diff) as [Key, Value][];

    if (diffEntries.length <= 0) {
      showModal(Prompt, { children: "no changes made" });
      return;
    }

    const contract = new CW3(wallet, cw3);

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
    });

    const configUpdateMeta: CW3ConfigUpdateMeta = {
      type: "cw3_config",
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
      tagPayloads: getTagPayloads(propMeta.willExecute && "cw3_config"),
    });
  }

  return {
    isTime: getValues("isTime"),
    createProposal: handleSubmit(createProposal),
    isSubmitDisabled: isSubmitting || !isValid || !isDirty,
  };
}
