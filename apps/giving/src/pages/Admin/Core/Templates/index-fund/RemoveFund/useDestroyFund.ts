import Popup from "@/components/Popup";
import { useModalContext } from "@/contexts/ModalContext";
import useCosmosTxSender from "@/hooks/useCosmosTxSender/useCosmosTxSender";
import { useAdminResources } from "@/pages/Admin/Guard";
import { useGetWallet } from "@ap/contexts/wallet-context";
import { CW3, IndexFund } from "@ap/contracts";
import { useFormContext } from "react-hook-form";
import { FundDestroyValues, RemoveFundMeta } from "@/pages/Admin/types";

export default function useDestroyFund() {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<FundDestroyValues>();
  const { showModal } = useModalContext();
  const sendTx = useCosmosTxSender();
  const { cw3, propMeta } = useAdminResources();
  const { wallet } = useGetWallet();

  async function destroyFund(data: FundDestroyValues) {
    if (data.fundId === "") {
      showModal(Popup, { message: "Please select fund to remove" });
      return;
    }
    const indexFundContract = new IndexFund(wallet);
    const embeddedRemoveFundMsg = indexFundContract.createEmbeddedRemoveFundMsg(
      +data.fundId
    );

    //get fund details for proposal preview
    const fundDetails = await indexFundContract.getFundDetails(+data.fundId);
    const removeFundMeta: RemoveFundMeta = {
      type: "if_remove",
      data: fundDetails,
    };

    const adminContract = new CW3(wallet, cw3);
    const proposalMsg = adminContract.createProposalMsg(
      data.title,
      data.description,
      [embeddedRemoveFundMsg],
      JSON.stringify(removeFundMeta)
    );

    await sendTx({
      msgs: [proposalMsg],
      ...propMeta,
    });
  }

  return {
    destroyFund: handleSubmit(destroyFund),
    isSubmitDisabled: isSubmitting,
  };
}
