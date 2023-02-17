import { useAdminResources } from "@/pages/Admin/Guard";
import { useGetter } from "@/store/accessors";
import { useGetWallet } from "@ap/contexts/wallet-context";
import { CW3, IndexFund } from "@ap/contracts";
import { cleanObject, condense, roundDown } from "@ap/helpers";
import useCosmosTxSender from "@ap/hooks/use-cosmos-tx-sender";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { CreateFundMeta, FundCreatorValues } from "@/pages/Admin/types";
import { FundDetails } from "@ap/types/contracts";
import { INIT_SPLIT } from ".";

export default function useCreateFund() {
  const { cw3, propMeta } = useAdminResources();
  const { wallet } = useGetWallet();
  const sendTx = useCosmosTxSender();
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
      rotating_fund: isFundRotating || undefined,
      split_to_liquid:
        splitToLiquid === INIT_SPLIT
          ? undefined
          : roundDown(condense(splitToLiquid)),
      expiry_time:
        expiryTime === "" ? undefined : new Date(expiryTime).getTime() / 1000,
      expiry_height: expiryHeight === "" ? undefined : +expiryHeight,
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
    const adminContract = new CW3(wallet, cw3);
    const proposalMsg = adminContract.createProposalMsg(
      title,
      description,
      [embeddedExecuteMsg],
      JSON.stringify(createFundMeta)
    );

    await sendTx({
      msgs: [proposalMsg],
      ...propMeta,
    });

    setSubmitting(false);
  }

  return { createFund, isSubmitting };
}
