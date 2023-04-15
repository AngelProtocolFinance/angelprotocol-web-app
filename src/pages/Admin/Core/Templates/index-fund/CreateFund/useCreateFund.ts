import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { CreateFundMeta, FundCreatorValues } from "pages/Admin/types";
import { FundDetails } from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import { useGetWallet } from "contexts/WalletContext";
import { useGetter } from "store/accessors";
import CW3 from "contracts/CW3";
import IndexFund from "contracts/IndexFund";
import useTxSender from "hooks/useTxSender";
import { roundDownToNum } from "helpers";
import { blockTime } from "helpers/admin";
import { cleanObject } from "helpers/cleanObject";
import { INIT_SPLIT } from "./index";

export default function useCreateFund() {
  const { multisig, propMeta } = useAdminResources();
  const { wallet } = useGetWallet();
  const sendTx = useTxSender();
  const { trigger, getValues } = useFormContext<FundCreatorValues>();
  const newFundMembers = useGetter((state) => state.admin.newFundMembers);

  const [isSubmitting, setSubmitting] = useState(false);

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
    const indexFundContract = new IndexFund(wallet);

    const newFundDetails: Omit<FundDetails, "id"> = {
      name: fundName,
      description: fundDescription,
      members: newFundMembers,
      rotatingFund: isFundRotating,
      splitToLiquid:
        splitToLiquid === INIT_SPLIT
          ? 0
          : roundDownToNum(+splitToLiquid * 100, 0),
      expiryTime: expiryTime === "" ? 0 : blockTime(expiryTime),
      expiryHeight: expiryHeight === "" ? 0 : +expiryHeight,
    };

    //remove undefined fields
    const cleanedNewFundDetails = cleanObject(newFundDetails);

    const embeddedExecuteMsg = indexFundContract.createEmbeddedCreateFundMsg(
      cleanedNewFundDetails
    );

    //create proposal meta
    const createFundMeta: CreateFundMeta = {
      type: "if_create",
      data: newFundDetails,
    };
    //create proposal msg
    const adminContract = new CW3(wallet, multisig);
    const proposalMsg = adminContract.createProposalMsg(
      title,
      description,
      [embeddedExecuteMsg],
      JSON.stringify(createFundMeta)
    );

    await sendTx({
      content: { type: "cosmos", val: [proposalMsg] },
      ...propMeta,
    });

    setSubmitting(false);
  }

  return { createFund, isSubmitting };
}
