import { Dec } from "@terra-money/terra.js";
import { useFormContext } from "react-hook-form";
import { ProposalMeta, proposalTypes } from "pages/Admin/types";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { useSetModal } from "components/Modal/Modal";
import { sendTerraTx } from "services/transaction/sendTerraTx";
import { terra } from "services/terra/terra";
import { admin, tags } from "services/terra/tags";
import Admin from "contracts/Admin";
import Indexfund from "contracts/IndexFund";
import { FundDetails } from "contracts/types";
import cleanObject from "helpers/cleanObject";
import { useState } from "react";
import { useGetter, useSetter } from "store/accessors";
import { proposalSuccessLink } from "../constants";
import { INIT_SPLIT } from "./FundCreator";
import { FundCreatorValues } from "./fundCreatorSchema";
import useWalletContext from "hooks/useWalletContext";

export default function useCreateFund() {
  const { wallet } = useWalletContext();
  const { showModal } = useSetModal();
  const dispatch = useSetter();
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
    const indexFundContract = new Indexfund(wallet);

    const newFundDetails: Omit<FundDetails, "id"> = {
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

    //create proposal meta
    const createFundMeta: ProposalMeta = {
      type: proposalTypes.indexFund_createFund,
      data: newFundDetails,
    };
    //create proposal msg
    const adminContract = new Admin("apTeam", wallet);
    const proposalMsg = adminContract.createProposalMsg(
      title,
      description,
      [embeddedExecuteMsg],
      JSON.stringify(createFundMeta)
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
        successLink: proposalSuccessLink,
        successMessage: "Create fund proposal submitted",
      })
    );
    showModal(TransactionPrompt, {});

    setSubmitting(false);
  }

  return { createFund, isSubmitting };
}
