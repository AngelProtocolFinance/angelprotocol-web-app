import { useConnectedWallet } from "@terra-money/use-wallet";
import { useFormContext } from "react-hook-form";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { useSetModal } from "components/Modal/Modal";
import Popup from "components/Popup/Popup";
import { sendTerraTx } from "services/transaction/sendTerraTx";
import Admin from "contracts/Admin";
import Indexfund from "contracts/IndexFund";
import { useSetter } from "store/accessors";
import { FundDestroyValues } from "./fundDestroyerSchema";

export default function useDestroyFund() {
  const { handleSubmit } = useFormContext<FundDestroyValues>();
  const dispatch = useSetter();
  const wallet = useConnectedWallet();
  const { showModal } = useSetModal();

  async function destroyFund(data: FundDestroyValues) {
    if (data.fundId === "") {
      showModal(Popup, { message: "Please select fund to remove" });
      return;
    }
    const indexFund = new Indexfund(wallet);
    const embeddedRemoveFundMsg = indexFund.createEmbeddedRemoveFundMsg(
      +data.fundId
    );

    const admin = new Admin(wallet);
    const proposalMsg = admin.createProposalMsg(data.title, data.description, [
      embeddedRemoveFundMsg,
    ]);

    dispatch(sendTerraTx({ msgs: [proposalMsg], wallet }));
    showModal(TransactionPrompt, {});
  }

  return { destroyFund: handleSubmit(destroyFund) };
}
