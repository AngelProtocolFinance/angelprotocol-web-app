import { Dec } from "@terra-money/terra.js";
import { useConnectedWallet } from "@terra-money/use-wallet";
import { useFormContext } from "react-hook-form";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { useSetModal } from "components/Modal/Modal";
import { sendTerraTx } from "services/transaction/sendTerraTx";
import Admin from "contracts/Admin";
import Indexfund from "contracts/IndexFund";
import { FundDetails } from "contracts/types";
import { useGetter, useSetter } from "store/accessors";
import { useState } from "react";
import { INIT_SPLIT } from "./FundCreator";
import { FundCreatorValues } from "./fundCreatorSchema";
import cleanObject from "helpers/cleanObject";

export default function useCreateFund() {
  const [isSubmitting, setSubmitting] = useState(false);
  const { trigger, getValues } = useFormContext<FundCreatorValues>();
  const dispatch = useSetter();
  const newFundMembers = useGetter((state) => state.admin.fundMembers);
  const wallet = useConnectedWallet();
  const { showModal } = useSetModal();

  async function createFund() {
    setSubmitting(true);
    //validate select fields
    const isValid = await trigger([
      "title",
      "description",
      "fundName",
      "fundDescription",
      "expiryHeight",
      "expiryTime",
    ]);

    if (!isValid) return;

    const title = getValues("title");
    const description = getValues("description");
    const fundName = getValues("fundName");
    const fundDescription = getValues("fundDescription");
    const expiryHeight = getValues("expiryHeight");
    const expiryTime = getValues("expiryTime");
    const splitToLiquid = getValues("splitToLiquid");
    const isFundRotating = getValues("isFundRotating");

    //create embedded execute msg
    const indexFundContract = new Indexfund(wallet);

    //get next fundId
    const fundsListRes = await indexFundContract.getFundList();
    const maxFundId = fundsListRes.funds.reduce(
      (result, fund) => (fund.id > result ? fund.id : result),
      0
    );

    const newFundDetails: FundDetails = {
      id: maxFundId + 1,
      name: fundName,
      description: fundDescription,
      members: newFundMembers,
      rotating_fund: isFundRotating || undefined,
      split_to_liquid:
        splitToLiquid === INIT_SPLIT
          ? undefined
          : new Dec(splitToLiquid).div(100).toFixed(2, Dec.ROUND_DOWN),
      expiry_time:
        expiryTime === "" ? undefined : new Date(expiryTime).getTime() / 1000,
      expiry_height: expiryHeight === "" ? undefined : +expiryHeight,
    };

    //remove undefined fields
    const cleanedNewFundDetails = cleanObject(newFundDetails, [undefined]);

    const embeddedExecuteMsg = indexFundContract.createEmbeddedCreateFundMsg(
      cleanedNewFundDetails
    );

    //create proposal msg
    const adminContract = new Admin(wallet);
    const proposalMsg = adminContract.createProposalMsg(title, description, [
      embeddedExecuteMsg,
    ]);

    dispatch(sendTerraTx({ msgs: [proposalMsg], wallet }));
    showModal(TransactionPrompt, {});

    setSubmitting(false);
  }

  return { createFund, isSubmitting };
}
