import { useConnectedWallet } from "@terra-money/use-wallet";
import { useFormContext } from "react-hook-form";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { useSetModal } from "components/Modal/Modal";
import Popup from "components/Popup/Popup";
import { sendTerraTx } from "services/transaction/sendTerraTx";
import { terra } from "services/terra/terra";
import { admin, tags } from "services/terra/tags";
import Admin from "contracts/Admin";
import Indexfund from "contracts/IndexFund";
import { useSetter } from "store/accessors";
import { proposalSuccessLink } from "../constants";
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
    const indexFundContract = new Indexfund(wallet);
    const embeddedRemoveFundMsg = indexFundContract.createEmbeddedRemoveFundMsg(
      +data.fundId
    );

    const adminContract = new Admin("apTeam", wallet);
    const proposalMsg = adminContract.createProposalMsg(
      data.title,
      data.description,
      [embeddedRemoveFundMsg]
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
        successMessage: "Fund deletion proposal submitted",
      })
    );
    showModal(TransactionPrompt, {});
  }

  return { destroyFund: handleSubmit(destroyFund) };
}
