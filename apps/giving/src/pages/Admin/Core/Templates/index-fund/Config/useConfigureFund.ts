import Popup from "@/components/Popup";
import { useModalContext } from "@/contexts/ModalContext";
import CW3 from "@/contracts/CW3";
import IndexFund from "@/contracts/IndexFund";
import useCosmosTxSender from "@/hooks/useCosmosTxSender/useCosmosTxSender";
import { useAdminResources } from "@/pages/Admin/Guard";
import { useGetWallet } from "@ap/contexts/wallet-context";
import {
  cleanObject,
  genDiffMeta,
  getPayloadDiff,
  scaleToStr,
} from "@ap/helpers";
import { useFormContext } from "react-hook-form";
import { FundConfigUpdateMeta, FundConfigValues } from "@/pages/Admin/types";
import { FundConfig } from "@ap/types/contracts";

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
      showModal(Popup, { message: "no changes detected" });
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
