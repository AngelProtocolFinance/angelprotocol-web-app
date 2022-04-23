import { useFormContext } from "react-hook-form";
import { ProposalMeta } from "pages/Admin/types";
import { admin, tags } from "services/terra/tags";
import { terra } from "services/terra/terra";
import { sendTerraTx } from "services/transaction/sendTerraTx";
import { useModalContext } from "components/ModalContext/ModalContext";
import Popup from "components/Popup/Popup";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { useSetter } from "store/accessors";
import Admin from "contracts/Admin";
import Indexfund from "contracts/IndexFund";
import useWalletContext from "hooks/useWalletContext";
import { proposalTypes } from "constants/routes";
import genProposalsLink from "../genProposalsLink";
import { FundDestroyValues } from "./fundDestroyerSchema";

export default function useDestroyFund() {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<FundDestroyValues>();
  const dispatch = useSetter();
  const { wallet } = useWalletContext();
  const { showModal } = useModalContext();

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
            { type: tags.admin, id: admin.proposals },
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
