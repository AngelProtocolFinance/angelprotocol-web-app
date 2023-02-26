import Prompt from "@giving/components/prompt";
import { useAdminResources } from "@giving/contexts/admin";
import { useModalContext } from "@giving/contexts/modal-context";
import { useGetWallet } from "@giving/contexts/wallet-context";
import CW3 from "@giving/contracts/CW3";
import IndexFund from "@giving/contracts/IndexFund";
import { scaleToStr } from "@giving/helpers";
import { genDiffMeta, getPayloadDiff } from "@giving/helpers/admin";
import { cleanObject } from "@giving/helpers/cleanObject";
import useCosmosTxSender from "@giving/hooks/useCosmosTxSender/useCosmosTxSender";
import { useFormContext } from "react-hook-form";
import { FundConfig } from "@giving/types/contracts";
import {
  FundConfigUpdateMeta,
  FundConfigValues,
} from "@giving/types/pages/admin";

type Key = keyof FundConfig;
type Value = FundConfig[Key];
export default function useConfigureFund() {
  const { cw3, propMeta } = useAdminResources();
  const { wallet } = useGetWallet();
  const {
    handleSubmit,
    formState: { isSubmitting, isDirty, isValid },
  } = useFormContext<FundConfigValues>();
  const { showModal } = useModalContext();
  const sendTx = useCosmosTxSender();

  async function configureFund({
    title,
    description,
    initialConfigPayload,
    ...data
  }: FundConfigValues) {
    //check for changes
    const diff = getPayloadDiff(initialConfigPayload, data);

    const diffEntries = Object.entries(diff) as [Key, Value][];
    if (diffEntries.length <= 0) {
      showModal(Prompt, { children: "no changes detected" });
      return;
    }

    const configUpdateMeta: FundConfigUpdateMeta = {
      type: "if_config",
      data: genDiffMeta(diffEntries, initialConfigPayload),
    };

    const indexFundContract = new IndexFund(wallet);
    const configUpdateMsg = indexFundContract.createEmbeddedFundConfigMsg(
      //don't send diff since unchanged val will be null, and null value will set an attribute to default
      cleanObject({
        ...data,
        funding_goal: data.funding_goal && scaleToStr(data.funding_goal),
      })
    );

    const adminContract = new CW3(wallet, cw3);
    const proposalMsg = adminContract.createProposalMsg(
      title,
      description,
      [configUpdateMsg],
      JSON.stringify(configUpdateMeta)
    );

    await sendTx({
      msgs: [proposalMsg],
      ...propMeta,
    });
  }

  return {
    configureFund: handleSubmit(configureFund),
    isSubmitDisabled: isSubmitting || !isValid || !isDirty,
  };
}
