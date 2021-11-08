import ErrPop, { Props as ErrProps } from "./ErrPop";
import { useSetModal } from "components/Nodal/Nodal";
import { chains } from "contracts/types";
import { useWallet } from "use-wallet";
import { ethers, BigNumber, utils } from "ethers";
import { Values } from "./types";
import { ap_wallets } from "constants/contracts";
import { denoms } from "constants/currency";
import { useFormContext } from "react-hook-form";
import displayEthError from "./displayEthError";
import { useSetter } from "store/accessors";
import { setPending } from "services/wallet/walletSlice";

export default function useEthSender() {
  const wallet = useWallet();
  const dispatch = useSetter();
  const { reset } = useFormContext();
  const { showModal } = useSetModal();

  async function sender(data: Values) {
    const wei_balance = BigNumber.from(wallet.balance);
    const eth_amount = data.amount;
    const wei_amount = utils.parseEther(eth_amount.toString());

    try {
      if (!wallet.ethereum) {
        showModal<ErrProps>(ErrPop, {
          desc: "No ethereum wallet is currently connected.",
        });
        return;
      }

      //network check
      if (String(wallet.chainId) !== chains.ropsten) {
        showModal<ErrProps>(ErrPop, {
          desc: "Kindly change your wallet network to Kovan",
        });
        return;
      }

      //balance check
      if (wei_amount.gt(wei_balance)) {
        showModal<ErrProps>(ErrPop, {
          desc: "Not enough balance to make this transaction",
        });
        return;
      }

      const provider = new ethers.providers.Web3Provider(wallet.ethereum);
      const signer = provider.getSigner();

      const response = await signer.sendTransaction({
        //this method auto-populates other fields, like chainId, nonce, gas fees ...
        to: ap_wallets[denoms.ether][chains.ropsten],
        value: wei_amount,
      });

      dispatch(setPending({ amount: +data.amount, hash: response.hash }));
    } catch (error) {
      displayEthError(error, showModal);
    } finally {
      reset();
    }
  }

  return sender;
}
