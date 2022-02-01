import { ethers } from "ethers";
import { Values } from "./types";
import { useFormContext } from "react-hook-form";
import { useSetter } from "store/accessors";
import { setStage } from "services/transaction/transactionSlice";
import { Step } from "services/transaction/types";
import { useSetModal } from "components/Nodal/Nodal";
import useTxUpdator from "services/transaction/updators";
import { XdefiWindow } from "services/provider/types";

export default function useEthSender() {
  const { updateTx } = useTxUpdator();
  const { hideModal } = useSetModal();
  const { setValue } = useFormContext();

  async function sender(data: Values) {
    try {
      const xwindow = window as XdefiWindow;

      updateTx({ step: Step.submit, message: "Submitting transaction.." });

      const provider = new ethers.providers.Web3Provider(
        xwindow.xfi?.ethereum!
      );
      const signer = provider.getSigner();
      const response = await signer.sendTransaction(tx!);
      dispatch(setPending({ amount: +data.amount, hash: response.hash }));
      dispatch(
        setStage({
          step: Step.form,
          content: null,
        })
      );

      if (hideModal !== undefined) {
        hideModal();
      }
    } catch (error) {
      handleEthError(error, handleTxError);
    } finally {
      setValue("amount", "");
    }
  }

  return sender;
}
