import { useFormContext } from "react-hook-form";
import { proposalTypes } from "types/routes";
import { adminTags, terraTags } from "types/services/terra";
import { ProposalMeta } from "pages/Admin/types";
import { terra } from "services/terra/terra";
import { sendTerraTx } from "slices/transaction/transactors/sendTerraTx";
import { useSetter } from "store/accessors";
import { useSetModal } from "components/Modal/Modal";
import Popup from "components/Popup/Popup";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import Admin from "contracts/Admin";
import Indexfund from "contracts/IndexFund";
import useWalletContext from "hooks/useWalletContext";
import genProposalsLink from "../genProposalsLink";
import { FundDestroyValues } from "./fundDestroyerSchema";

export default function useDestroyFund() {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<FundDestroyValues>();
  const dispatch = useSetter();
  const { wallet } = useWalletContext();
  const { showModal } = useSetModal();

  async function destroyFund(data: FundDestroyValues) {
    if (data.fundId === "") {
      showModal(Popup, { message: "Please select fund to remove" });
      return;
    }
    const indexFundContract = new Indexfund(wallet);
    const embeddedRemoveFundMsg = indexFundContract.createEmbeddedRemoveFundMsg(
      +data.fundId
    );

    //get fund details for proposal preview
    const fundDetails = await indexFundContract.getFundDetails(+data.fundId);
    const removeFundMeta: ProposalMeta = {
      type: proposalTypes.indexFund_removeFund,
      data: fundDetails,
    };

    const adminContract = new Admin("apTeam", wallet);
    const proposalMsg = adminContract.createProposalMsg(
      data.title,
      data.description,
      [embeddedRemoveFundMsg],
      JSON.stringify(removeFundMeta)
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
        successMessage: "Fund deletion proposal submitted",
      })
    );
    showModal(TransactionPrompt, {});
  }

  return {
    destroyFund: handleSubmit(destroyFund),
    isSubmitDisabled: isSubmitting,
  };
}
