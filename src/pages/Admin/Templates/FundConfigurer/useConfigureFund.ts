import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Dec } from "@terra-money/terra.js";
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
import cleanObject from "helpers/cleanObject";
import { FundConfigValues } from "./fundconfigSchema";
import genProposalsLink from "../genProposalsLink";
import { ProposalMeta, proposalTypes } from "pages/Admin/types";
import useWalletContext from "hooks/useWalletContext";

export default function useConfigureFund() {
  const { wallet } = useWalletContext();
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
    setValue(
      "funding_goal",
      indexFundConfig.funding_goal &&
        new Dec(indexFundConfig.funding_goal).div(1e6).toInt().toString()
    );
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
      funding_goal:
        funding_goal && new Dec(funding_goal).mul(1e6).toInt().toString(),
    };

    //check for changes
    const diff = getPayloadDiff(prevConfig, nextConfig);
    if (Object.entries(diff).length <= 0) {
      showModal(Popup, { message: "no changes detected" });
      return;
    }

    //construct tx preview, prettified
    const configUpdateMeta: ProposalMeta = {
      type: proposalTypes.indexFund_configUpdate,
      data: {
        nextConfig: {
          ...nextConfig,
          funding_goal: funding_goal && "$ " + (+funding_goal).toLocaleString(),
        },
        prevConfig: {
          ...prevConfig,
          funding_goal:
            prevConfig.funding_goal &&
            "$ " +
              new Dec(prevConfig.funding_goal)
                .div(1e6)
                .toInt()
                .toNumber()
                .toLocaleString(),
        },
      },
    };

    const indexFundContract = new Indexfund(wallet);
    const configUpdateMsg = indexFundContract.createEmbeddedFundConfigMsg(
      cleanObject(nextConfig, ["", undefined])
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
            { type: tags.admin, id: admin.proposals },
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
