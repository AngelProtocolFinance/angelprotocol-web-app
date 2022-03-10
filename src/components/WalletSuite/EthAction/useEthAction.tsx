import { Dec } from "@terra-money/terra.js";
import { useSetModal } from "components/Modal/Modal";
import { chainIDs } from "constants/chainIDs";
import { denoms } from "constants/currency";
import { ethers } from "ethers";
import { setMetamaskStatus } from "services/wallet/metamaskSlice";
import { EthConnectInfo } from "services/wallet/types";
import { setIsUpdating } from "services/wallet/walletSlice";
import { useGetter, useSetter } from "store/accessors";
import XDefiError from "./xDefiError";

declare var window: any;

export default function useEthAction(options: EthConnectInfo) {
  const { showModal } = useSetModal();
  const { isUpdating } = useGetter((state) => state.wallet);
  const dispatch = useSetter();
  const isMetaMask = options.name === "MetaMask";

  async function handleClick() {
    if (window.xfi?.ethereum!.isMetaMask) {
      showModal(XDefiError, {});
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
          icon: options.icon,
          chainId: String(network.chainId) as chainIDs,
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
