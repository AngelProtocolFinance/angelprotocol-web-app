import { WalletStatus } from "@terra-money/wallet-provider";
import { app, site } from "constants/routes";
import useWalletContext from "hooks/useWalletContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import registerRoutes from "../routes";
import routes from "./routes";

export default function ConnectWallet() {
  const navigate = useNavigate();
  const { status } = useWalletContext();

  useEffect(() => {
    if (status === WalletStatus.WALLET_CONNECTED) {
      navigate(
        `${site.app}/${app.register}/${registerRoutes.wallet}/${routes.submit}`
      );
    }
  }, [status, navigate]);

  return (
    <div className="xl:w-1/2 font-semibold text-sm md:text-lg">
      Please connect your wallet using the "Connect" button in the top-right of
      the page
    </div>
  );
}
