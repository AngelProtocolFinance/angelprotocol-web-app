import ErrPop, { Props as ErrProps } from "./ErrPop";
import { useSetModal } from "components/Nodal/Nodal";
import { useWallet } from "use-wallet";
import { ethers } from "ethers";
import { Values } from "./types";
import { useFormContext } from "react-hook-form";
import displayEthError from "./displayEthError";
import { useSetter } from "store/accessors";
import { setPending } from "services/wallet/walletSlice";
import useEthEstimator from "./useEthEstimator";

export default function useEthSender() {
  const wallet = useWallet();
  const dispatch = useSetter();
  const { reset } = useFormContext();
  const { showModal } = useSetModal();
  const tx = useEthEstimator();

  async function sender(data: Values) {
    try {
      if (!wallet.ethereum) {
        showModal<ErrProps>(ErrPop, {
          desc: "No ethereum wallet is currently connected.",
        });
        return;
      }
      const provider = new ethers.providers.Web3Provider(wallet.ethereum);
      const signer = provider.getSigner();
      const response = await signer.sendTransaction(tx!);

      dispatch(setPending({ amount: +data.amount, hash: response.hash }));
    } catch (error) {
      displayEthError(error, showModal);
    } finally {
      reset();
    }
  }

  return sender;
}
