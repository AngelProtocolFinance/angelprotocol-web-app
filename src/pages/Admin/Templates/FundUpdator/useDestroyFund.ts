import { useConnectedWallet } from "@terra-money/use-wallet";
import { useFormContext } from "react-hook-form";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { useSetModal } from "components/Modal/Modal";
import Popup from "components/Popup/Popup";
import { sendTerraTx } from "services/transaction/sendTerraTx";
import { terra } from "services/terra/terra";
import { admin, tags } from "services/terra/tags";
import { useSetter } from "store/accessors";
import { FundUpdateValues } from "./fundUpdatorSchema";

export default function useDestroyFund() {
  const { handleSubmit } = useFormContext<FundUpdateValues>();
  const dispatch = useSetter();
  const wallet = useConnectedWallet();
  const { showModal } = useSetModal();

  async function updateFund() {
    // dispatch(
    //   sendTerraTx({
    //     msgs: [proposalMsg],
    //     wallet,
    //     tagPayloads: [
    //       terra.util.invalidateTags([
    //         { type: tags.admin, id: admin.proposals },
    //       ]),
    //     ],
    //   })
    // );
    // showModal(TransactionPrompt, {});
  }

  return { updateFund: handleSubmit(updateFund) };
}
