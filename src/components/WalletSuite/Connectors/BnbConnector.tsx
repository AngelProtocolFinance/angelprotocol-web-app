import { Dwindow } from "@types-slice/provider";
import binanceIcon from "assets/icons/wallets/binance.png";
import { useSetBinanceWallet } from "contexts/BinanceWalletContext/BinanceWalletContext";
import { useModalContext } from "contexts/ModalContext/ModalContext";
import { useGetter } from "store/accessors";
import { DeviceType, deviceType } from "helpers/deviceType";
import { RejectBinanceLogin } from "errors/errors";
import WalletPrompt from "../WalletPrompt";
import ConnectButton from "./ConnectButton";

const dwindow = window as Dwindow;
export default function BnbConnector() {
  const { isUpdating } = useGetter((state) => state.wallet);
  const { connect } = useSetBinanceWallet();
  const { showModal } = useModalContext();

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
            "To use binance wallet, please remove priority from Xdefi - then reload the page.",
        });
        return;
        /**
         * only when xdefi is not prioritized will show
         * if there's an existing window.ethereum object
         */
      } else if (deviceType() !== DeviceType.DESKTOP) {
        showModal(WalletPrompt, {
          message: "Please use Binance Wallet on desktop to connect",
        });
        return;
      } else if (!dwindow.BinanceChain) {
        dwindow.open(binanceInstallLink, "_blank", "noopener noreferrer");
      } else {
        await connect();
      }
    } catch (err: any) {
      if (err instanceof RejectBinanceLogin) {
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
      _icon={binanceIcon}
      disabled={isUpdating}
    >
      Binance Wallet
    </ConnectButton>
  );
}

const binanceInstallLink =
  "https://chrome.google.com/webstore/detail/binance-wallet/fhbohimaelbohpjbbldcngcnapndodjp";

function isXdefiPrioritized() {
  return dwindow.xfi?.ethereum!.isMetaMask;
}
