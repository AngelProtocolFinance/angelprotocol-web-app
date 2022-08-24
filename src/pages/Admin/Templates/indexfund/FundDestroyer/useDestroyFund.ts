import { useFormContext } from "react-hook-form";
import { FundDestroyValues, RemoveFundMeta } from "pages/Admin/types";
import { useAdminResources } from "pages/Admin/Guard";
import { invalidateJunoTags } from "services/juno";
import { adminTags, junoTags } from "services/juno/tags";
import { useModalContext } from "contexts/ModalContext";
import Popup from "components/Popup";
import TransactionPrompt from "components/Transactor/TransactionPrompt";
import { useSetter } from "store/accessors";
import { sendCosmosTx } from "slices/transaction/transactors";
import CW3 from "contracts/CW3";
import IndexFund from "contracts/IndexFund";

export default function useDestroyFund() {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<FundDestroyValues>();
  const dispatch = useSetter();
  const { showModal } = useModalContext();
  const { cw3, proposalLink, chain } = useAdminResources();

  async function destroyFund(data: FundDestroyValues) {
    if (data.fundId === "") {
      showModal(Popup, { message: "Please select fund to remove" });
      return;
    }
    const indexFundContract = new IndexFund(chain);
    const embeddedRemoveFundMsg = indexFundContract.createEmbeddedRemoveFundMsg(
      +data.fundId
    );

    //get fund details for proposal preview
    const fundDetails = await indexFundContract.getFundDetails(+data.fundId);
    const removeFundMeta: RemoveFundMeta = {
      type: "if_remove",
      data: fundDetails,
    };

    const adminContract = new CW3(chain, cw3);
    const proposalMsg = adminContract.createProposalMsg(
      data.title,
      data.description,
      [embeddedRemoveFundMsg],
      JSON.stringify(removeFundMeta)
    );

    dispatch(
      sendCosmosTx({
        chain,
        msgs: [proposalMsg],
        tagPayloads: [
          invalidateJunoTags([
            { type: junoTags.admin, id: adminTags.proposals },
          ]),
        ],
        successLink: proposalLink,
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
