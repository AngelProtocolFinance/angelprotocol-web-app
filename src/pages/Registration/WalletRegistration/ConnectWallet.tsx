import { WalletStatus } from "@terra-money/wallet-provider";
import { app, site } from "constants/routes";
import useWalletContext from "hooks/useWalletContext";
import { useGetBinance } from "providers/BinanceWallet/BinanceWallet";
import { useGetMetamask } from "providers/Metamask/Metamask";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../common";
import registerRoutes from "../routes";
import routes from "./routes";

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

  return (
    <div className="flex flex-col gap-10 items-center xl:w-1/2 font-semibold text-sm md:text-lg">
      {isMetamaskConnected || isBinanceConnected ? (
        <div className="flex flex-col gap-3">
          <p>Only Terra compatible wallets are allowed!</p>
          <p>Please connect your Terra wallet</p>
        </div>
      ) : (
        <p>
          Please connect your Terra wallet using the "Connect" button in the
          top-right of the page
        </p>
      )}
      <Button
        className="bg-green-400 w-72 md:w-80 h-10 text-sm md:text-base"
        onClick={() =>
          navigate(`${site.app}/${app.register}/${registerRoutes.dashboard}`)
        }
      >
        Back to registration dashboard
      </Button>
    </div>
  );
}
