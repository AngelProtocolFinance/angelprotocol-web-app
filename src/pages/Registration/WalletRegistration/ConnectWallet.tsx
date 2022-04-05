import { WalletStatus } from "@terra-money/wallet-provider";
import { app, site } from "constants/routes";
import useWalletContext from "hooks/useWalletContext";
import { useGetBinance } from "providers/BinanceWallet/BinanceWallet";
import { useGetMetamask } from "providers/Metamask/Metamask";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import registerRoutes from "../routes";
import routes from "./routes";

const TEXT_CLASS_NAMES = "xl:w-1/2 font-semibold text-sm md:text-lg";

export default function ConnectWallet() {
  const navigate = useNavigate();
  const { status } = useWalletContext();
  const { connected: isMetamaskConnected } = useGetMetamask();
  const { connected: isBinanceConnected } = useGetBinance();

  useEffect(() => {
    if (status === WalletStatus.WALLET_CONNECTED) {
      navigate(
        `${site.app}/${app.register}/${registerRoutes.wallet}/${routes.submit}`
      );
    }
  }, [status, navigate]);

  return isMetamaskConnected || isBinanceConnected ? (
    <div className={`flex flex-col gap-5 ${TEXT_CLASS_NAMES}`}>
      <p>Only Terra compatible wallets are allowed!</p>
      <p>Please connect your Terra wallet</p>
    </div>
  ) : (
    <p className={TEXT_CLASS_NAMES}>
      Please connect your Terra wallet using the "Connect" button in the
      top-right of the page
    </p>
  );
}
