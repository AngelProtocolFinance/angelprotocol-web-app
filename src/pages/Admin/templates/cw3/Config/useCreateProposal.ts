import { useFormContext } from "react-hook-form";
import {
  CW3ConfigUpdateMeta,
  CW3ConfigValues,
  FormCW3Config,
} from "pages/Admin/types";
import { useAdminResources } from "pages/Admin/Guard";
import { getTagPayloads } from "pages/Admin/helpers";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import Popup from "components/Popup";
import TransactionPrompt from "components/Transactor/TransactionPrompt";
import { useSetter } from "store/accessors";
import { sendCosmosTx } from "slices/transaction/transactors";
import CW3 from "contracts/CW3";
import { genDiffMeta, getPayloadDiff } from "helpers/admin";

type Key = keyof FormCW3Config;
type Value = FormCW3Config[Key];

export default function useCreateProposal() {
  const { cw3, propMeta } = useAdminResources();
  const { wallet } = useGetWallet();
  const {
    getValues,
    handleSubmit,
    formState: { isSubmitting, isDirty, isValid },
  } = useFormContext<CW3ConfigValues>();
  const { showModal } = useModalContext();
  const dispatch = useSetter();

  async function createProposal({
    title,
    description,
    initial,
    isTime,
    ...newData
  }: CW3ConfigValues) {
    const diff = getPayloadDiff(initial, newData);
    const diffEntries = Object.entries(diff) as [Key, Value][];

    if (diffEntries.length <= 0) {
      showModal(Popup, { message: "no changes made" });
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

    dispatch(
      sendCosmosTx({
        wallet,
        msgs: [proposalMsg],
        tagPayloads: getTagPayloads("cw3_config", propMeta.isSingle),
        ...propMeta,
      })
    );
    showModal(TransactionPrompt, {});
  }

  return {
    isTime: getValues("isTime"),
    createProposal: handleSubmit(createProposal),
    isSubmitDisabled: isSubmitting || !isValid || !isDirty,
  };
}
