import { useWallet } from "use-wallet";
import { ethers } from "ethers";
import { Values } from "./types";
import { useFormContext } from "react-hook-form";
import handleEthError from "./handleEthError";
import { useSetter } from "store/accessors";
import { setPending } from "services/wallet/walletSlice";
import { setStage } from "services/donation/donationSlice";
import useEthEstimator from "./useEthEstimator";
import { Step } from "services/donation/types";
import useErrorHandler from "./useErrorHandler";
import { useSetModal } from "components/Nodal/Nodal";

export default function useEthSender() {
  const { hideModal } = useSetModal();
  const wallet = useWallet();
  const dispatch = useSetter();
  const { setValue } = useFormContext();
  const tx = useEthEstimator();
  const handleError = useErrorHandler();

  async function sender(data: Values) {
    try {
      if (!wallet.ethereum) {
        dispatch(
          setStage({
            step: Step.error,
            content: { message: "Wallet is disconnected" },
          })
        );
        return;
      }

      dispatch(
        setStage({
          step: Step.submit,
          content: { message: "Submitting transaction..." },
        })
      );

      const provider = new ethers.providers.Web3Provider(wallet.ethereum);
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
      handleEthError(error, handleError);
    } finally {
      setValue("amount", "");
    }
  }

  return sender;
}
