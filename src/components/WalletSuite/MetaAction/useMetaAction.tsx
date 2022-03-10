import { Dec } from "@terra-money/terra.js";
import { setIcon } from "components/WalletSuite/manageIcon";
import { chainIDs } from "constants/chainIDs";
import { denoms } from "constants/currency";
import { ethers } from "ethers";
import { setMetamaskStatus } from "services/wallet/metamaskSlice";
import { setIsUpdating } from "services/wallet/walletSlice";
import { useGetter, useSetter } from "store/accessors";

declare var window: any;

export default function useMetaAction(options: any) {
  const { isUpdating } = useGetter((state) => state.wallet);
  const dispatch = useSetter();
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

      dispatch(setIsUpdating(true));

      const network = await provider.getNetwork();
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const wei_balance = await signer.getBalance();
      const eth_balance = new Dec(parseInt(wei_balance.toHexString(), 16))
        .div(1e12)
        .toNumber();

      dispatch(
        setMetamaskStatus({
          connected: true,
          network: network.name,
          chainId:
            network.chainId === 1 ? chainIDs.eth_main : chainIDs.eth_ropsten,
          address,
          balance: eth_balance,
          coins: [{ amount: eth_balance / 1e6, denom: denoms.ether }],
        })
      );

      dispatch(setIsUpdating(false));
    }
  }
  return {
    handleClick,
    isUpdating,
  };
}
