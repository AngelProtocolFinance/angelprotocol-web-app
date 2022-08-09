import Decimal from "decimal.js";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { CreateFundMeta, FundCreatorValues } from "pages/Admin/types";
import { FundDetails } from "types/server/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import cleanObject from "pages/Admin/helpers/cleanObject";
import { invalidateJunoTags } from "services/juno";
import { adminTags, junoTags } from "services/juno/tags";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import TransactionPrompt from "components/Transactor/TransactionPrompt";
import { useGetter, useSetter } from "store/accessors";
import { sendCosmosTx } from "slices/transaction/transactors";
import CW3 from "contracts/CW3";
import IndexFund from "contracts/IndexFund";
import { INIT_SPLIT } from "./FundCreator";

export default function useCreateFund() {
  const { cw3, proposalLink } = useAdminResources();
  const { wallet } = useGetWallet();
  const { showModal } = useModalContext();
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
    const indexFundContract = new IndexFund(wallet);

    const newFundDetails: Omit<FundDetails, "id"> = {
      name: fundName,
      description: fundDescription,
      members: newFundMembers,
      rotating_fund: isFundRotating || undefined,
      split_to_liquid:
        splitToLiquid === INIT_SPLIT
          ? undefined
          : new Decimal(splitToLiquid).div(100).toFixed(2, Decimal.ROUND_DOWN),
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

    dispatch(
      sendCosmosTx({
        wallet,
        msgs: [proposalMsg],
        tagPayloads: [
          invalidateJunoTags([
            { type: junoTags.admin, id: adminTags.proposals },
          ]),
        ],
        successLink: proposalLink,
        successMessage: "Create fund proposal submitted",
      })
    );
    showModal(TransactionPrompt, {});

    setSubmitting(false);
  }

  return { createFund, isSubmitting };
}
