import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useConnectedWallet } from "@terra-money/use-wallet";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import Popup from "components/Popup/Popup";
import { useSetModal } from "components/Modal/Modal";
import { useIndexFundConfig } from "services/terra/indexFund/queriers";
import { sendTerraTx } from "services/transaction/sendTerraTx";
import { terra } from "services/terra/terra";
import { admin, tags } from "services/terra/tags";
import { useSetter } from "store/accessors";
import Indexfund from "contracts/IndexFund";
import Admin from "contracts/Admin";
import { FundConfig } from "contracts/types";
import getPayloadDiff from "helpers/getPayloadDiff";
import { proposalSuccessLink } from "../constants";
import { FundConfigValues } from "./fundconfigSchema";
import cleanObject from "helpers/cleanObject";

export default function useConfigureFund() {
  const wallet = useConnectedWallet();
  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting, isDirty, isValid },
  } = useFormContext<FundConfigValues>();
  const { indexFundConfig, isIndexFundConfigLoading } = useIndexFundConfig();
  const { showModal } = useSetModal();
  const dispatch = useSetter();

  //pre-fill fund config form
  useEffect(() => {
    if (isIndexFundConfigLoading) return;
    if (!indexFundConfig) return;
    setValue("fund_member_limit", indexFundConfig.fund_member_limit);
    setValue("fund_rotation", indexFundConfig.fund_rotation);
    setValue("funding_goal", indexFundConfig.funding_goal);
  }, [indexFundConfig, isIndexFundConfigLoading, setValue]);

  async function configureFund({
    title,
    description,
    funding_goal,
    ...fundConfig
  }: FundConfigValues) {
    const prevConfig: FundConfig = {
      fund_member_limit: indexFundConfig?.fund_member_limit,
      fund_rotation: indexFundConfig?.fund_rotation,
      funding_goal: indexFundConfig?.funding_goal,
    };

    const nextConfig = {
      ...fundConfig,
      //yup schema coerces string to number, therefore, convert back to string
      funding_goal: funding_goal && `${funding_goal}`,
    };

    //check for changes
    const diff = getPayloadDiff(prevConfig, nextConfig);
    if (Object.entries(diff).length <= 0) {
      showModal(Popup, { message: "no changes detected" });
      return;
    }

    const indexFundContract = new Indexfund(wallet);
    const configUpdateMsg = indexFundContract.createEmbeddedFundConfigMsg(
      cleanObject(nextConfig, ["", undefined])
    );

    const adminContract = new Admin("apTeam", wallet);
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
    configureFund: handleSubmit(configureFund),
    isSubmitDisabled: isSubmitting || !isValid || !isDirty,
  };
}
