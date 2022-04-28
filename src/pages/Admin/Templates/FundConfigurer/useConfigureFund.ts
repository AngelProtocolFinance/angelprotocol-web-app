import { Dec } from "@terra-money/terra.js";
import { useFormContext } from "react-hook-form";
import { FundConfigUpdateMeta } from "@types-page/admin";
import { FundConfig } from "@types-server/contracts";
import { adminTags, terraTags } from "services/terra/tags";
import { terra } from "services/terra/terra";
import { sendTerraTx } from "slices/transaction/transactors/sendTerraTx";
import { useSetter } from "store/accessors";
import { useSetModal } from "components/Modal/Modal";
import Popup from "components/Popup/Popup";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import Admin from "contracts/Admin";
import Indexfund from "contracts/IndexFund";
import useWalletContext from "hooks/useWalletContext";
import cleanObject from "helpers/cleanObject";
import getPayloadDiff from "helpers/getPayloadDiff";
import genDiffMeta from "../genDiffMeta";
import genProposalsLink from "../genProposalsLink";
import { FundConfigValues } from "./fundconfigSchema";

type Key = keyof FundConfig;
type Value = FundConfig[Key];
export default function useConfigureFund() {
  const { wallet } = useWalletContext();
  const {
    handleSubmit,
    formState: { isSubmitting, isDirty, isValid },
  } = useFormContext<FundConfigValues>();
  const { showModal } = useSetModal();
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
      type: "indexfund-config-update",
      data: genDiffMeta(diffEntries, initialConfigPayload),
    };

    const indexFundContract = new Indexfund(wallet);
    const configUpdateMsg = indexFundContract.createEmbeddedFundConfigMsg(
      //don't send diff since unchanged val will be null, and null value will set an attribute to default
      cleanObject({
        ...data,
        funding_goal:
          data.funding_goal &&
          new Dec(data.funding_goal).mul(1e6).toInt().toString(),
      })
    );

    const adminContract = new Admin("apTeam", wallet);
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
            { type: terraTags.admin, id: adminTags.proposals },
          ]),
        ],
        successLink: genProposalsLink("apTeam"),
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
