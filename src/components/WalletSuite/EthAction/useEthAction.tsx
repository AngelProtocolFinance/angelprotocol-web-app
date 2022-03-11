import { useSetModal } from "components/Modal/Modal";
import { ethers } from "ethers";
import { setMetamaskStatus } from "services/wallet/metamaskSlice";
import { EthConnectInfo } from "services/wallet/types";
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

      dispatch(
        setMetamaskStatus({
          connected: true,
          icon: options.icon,
        })
      );
    }
  }
  return {
    handleClick,
    isUpdating,
  };
}
