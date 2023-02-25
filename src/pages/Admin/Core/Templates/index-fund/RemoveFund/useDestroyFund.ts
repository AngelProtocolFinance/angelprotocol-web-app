import { useFormContext } from "react-hook-form";
import { FundDestroyValues, RemoveFundMeta } from "pages/Admin/types";
import { useAdminResources } from "pages/Admin/Guard";
import { queryContract } from "services/juno/queryContract";
import { useModalContext } from "contexts/ModalContext";
import Popup from "components/Popup";
import CW3 from "contracts/CW3";
import IndexFund from "contracts/IndexFund";
import useCosmosTxSender from "hooks/useCosmosTxSender";
import { contracts } from "constants/contracts";

export default function useDestroyFund() {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<FundDestroyValues>();
  const { showModal } = useModalContext();
  const sendTx = useCosmosTxSender();
  const { cw3, propMeta, getWallet } = useAdminResources();

  async function destroyFund(data: FundDestroyValues) {
    if (data.fundId === "") {
      showModal(Popup, { message: "Please select fund to remove" });
      return;
    }
    const wallet = getWallet();
    if (typeof wallet === "function") return wallet();

    const indexFundContract = new IndexFund(wallet);
    const embeddedRemoveFundMsg = indexFundContract.createEmbeddedRemoveFundMsg(
      +data.fundId
    );

    //get fund details for proposal preview
    const fundDetails = await queryContract("ifFund", contracts.index_fund, {
      fund_id: +data.fundId,
    });
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
