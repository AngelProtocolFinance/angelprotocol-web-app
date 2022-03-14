import { int } from "@terra-money/terra.js";
import { useSetModal } from "components/Modal/Modal";
import { ethers } from "ethers";
import { setMetamaskStatus } from "services/wallet/metamaskSlice";
import { EthConnectInfo, EthState } from "services/wallet/types";
import { useGetter, useSetter } from "store/accessors";
import XDefiError from "./xDefiError";

declare var window: any;

export default function useEthAction(options: EthConnectInfo) {
  const { showModal } = useSetModal();
  const dispatch = useSetter();
  const { isUpdating } = useGetter((state) => state.wallet);
  const initialState = useGetter((state) => state.metamask);
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
          ...initialState,
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
