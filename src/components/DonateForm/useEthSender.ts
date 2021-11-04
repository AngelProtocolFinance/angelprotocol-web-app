import ErrPop, { Props as ErrProps } from "components/Donater/ErrPop";
import Waiter, { Props as WaitProps } from "components/Donater/Waiter";
import Result, { Props as ResProps } from "components/Donater/Result";
import { useSetModal } from "components/Nodal/Nodal";
import { chains } from "contracts/types";
import { useWallet } from "use-wallet";
import { ethers, BigNumber } from "ethers";
import { Values } from "components/Donater/schema";
import { parseEther } from "@ethersproject/units";
import { ap_wallets } from "constants/contracts";
import { denoms } from "constants/currency";

export default function useEthSender() {
  const wallet = useWallet();
  const { showModal } = useSetModal();

  async function sender(data: Values) {
    const wei_balance = BigNumber.from(wallet.balance);
    const eth_amount = data.amount;
    const wei_amount = parseEther(eth_amount.toString());

    if (!wallet.ethereum) {
      showModal<ErrProps>(ErrPop, {
        desc: "No ethereum wallet is currently connected.",
      });
      return;
    }

    if (String(wallet.chainId) !== chains.kovan) {
      showModal<ErrProps>(ErrPop, {
        desc: "Kindly change your wallet network to Kovan",
      });
      return;
    }

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
      to: ap_wallets[denoms.ether][chains.kovan],
      value: wei_amount,
    });

    showModal<WaitProps>(Waiter, {});

    const receipt = await response.wait();

    showModal<ResProps>(Result, {
      sent: +data.amount,
      received: +data.amount,
      url: `https://kovan.etherscan.io/tx/${receipt.transactionHash}`,
      denom: denoms.ether,
      precision: 7,
    });
  }

  return sender;
}
