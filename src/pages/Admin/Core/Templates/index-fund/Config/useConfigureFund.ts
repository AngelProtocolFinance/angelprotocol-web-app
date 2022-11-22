import { useFormContext } from "react-hook-form";
import { FundConfigUpdateMeta, FundConfigValues } from "pages/Admin/types";
import { FundConfig } from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import Popup from "components/Popup";
import TransactionPrompt from "components/Transactor/TransactionPrompt";
import { useSetter } from "store/accessors";
import { sendCosmosTx } from "slices/transaction/transactors";
import CW3 from "contracts/CW3";
import IndexFund from "contracts/IndexFund";
import { scaleToStr } from "helpers";
import { cleanObject, genDiffMeta, getPayloadDiff } from "helpers/admin";

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
  const dispatch = useSetter();

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

    dispatch(
      sendCosmosTx({
        wallet,
        msgs: [proposalMsg],
        ...propMeta,
      })
    );
    showModal(TransactionPrompt, {});
  }

  return {
    configureFund: handleSubmit(configureFund),
    isSubmitDisabled: isSubmitting || !isValid || !isDirty,
  };
}
