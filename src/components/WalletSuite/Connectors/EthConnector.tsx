import { useSetModal } from "components/Modal/Modal";
import { useSetMetamask } from "providers/Metamask/Metamask";
import metamaskIcon from "images/icons/metamask.png";
import { useGetter } from "store/accessors";
import { Dwindow } from "services/provider/types";
import WalletPrompt from "../WalletPrompt";
import ConnectButton from "./ConnectButton";
import { RejectMetamaskLogin } from "providers/Metamask/useEthereum";
import { deviceType, DeviceType } from "helpers/deviceType";

const dwindow = window as Dwindow;
export default function EthConnector() {
  const { isUpdating } = useGetter((state) => state.wallet);
  const { connect } = useSetMetamask();
  const { showModal } = useSetModal();

  async function handleClick() {
    try {
      /**
       * if xdefi is installed prioritize, it's impossible
       * to tell if metamask is present since xdefi overwrites
       * the whole window.ethereum object
       *
       * user may also have other wallets that overwrites
       * the window.ethereum object but we can't check
       * every wallet there exist in this planet
       */
      if (isXdefiPrioritized()) {
        showModal(WalletPrompt, {
          message:
            "To use metamask, please remove priority from Xdefi - then reload the page.",
        });
        return;
        /**
         * only when xdefi is not prioritized will show
         * if there's an existing window.ethereum object
         */
      } else if (
        deviceType() !== DeviceType.DESKTOP &&
        !(window as Dwindow).ethereum
      ) {
        showModal(WalletPrompt, {
          message:
            "Please use the browser inside MetaMask Mobile App to connect",
        });
        return;
      } else if (!dwindow.ethereum?.isMetaMask) {
        dwindow.open(metamaskInstallLink, "_blank", "noopener noreferrer");
      } else {
        await connect();
      }
    } catch (err: any) {
      if (err instanceof RejectMetamaskLogin) {
        showModal(WalletPrompt, {
          message: err.message,
        });
      } else {
        showModal(WalletPrompt, {
          message: "Failed to connect",
        });
      }
    }
  }

  return (
    <ConnectButton
      onClick={handleClick}
      _icon={metamaskIcon}
      disabled={isUpdating}
    >
      Metamask
    </ConnectButton>
  );
}

const metamaskInstallLink =
  "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en";

function isXdefiPrioritized() {
  return dwindow.xfi?.ethereum!.isMetaMask;
}
