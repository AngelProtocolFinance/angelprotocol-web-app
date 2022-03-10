import { Dec } from "@terra-money/terra.js";
import { setIcon } from "components/WalletSuite/manageIcon";
import { ethers } from "ethers";
import { useGetter } from "store/accessors";

declare var window: any;

export default function useTerraAction(options: any) {
  const { isUpdating } = useGetter((state) => state.wallet);
  const isMetaMask = options.name === "MetaMask";

  async function handleClick() {
    if (window.xfi?.ethereum!.isMetaMask) {
      alert("Please de-prioritize XDEFI Wallet and reload the page");
      return;
    }

    if (isMetaMask) {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum!,
        "any"
      );

      await provider.send("eth_requestAccounts", []);
      const network = await provider.getNetwork();
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const wei_balance = await signer.getBalance();
      const eth_balance = new Dec(parseInt(wei_balance.toHexString(), 16))
        .div(1e18)
        .toNumber();
    }
  }
  return {
    handleClick,
    isUpdating,
  };
}
