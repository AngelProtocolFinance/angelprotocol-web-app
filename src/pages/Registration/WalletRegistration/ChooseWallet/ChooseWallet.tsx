import { WalletStatus } from "@terra-money/wallet-provider";
import { useCallback } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button } from "pages/Registration/common";
import Loader from "components/Loader";
import useWalletContext from "hooks/useWalletContext";
import { app, site } from "constants/routes";
import { default as registerRoutes } from "../../routes";
import routes from "../routes";
import Title from "./Title";
import Web3Auth from "./Web3Auth";

export default function ChooseWallet() {
  const navigate = useNavigate();
  const { status, availableWallets } = useWalletContext();
  const login = useCallback(
    (provider: string) =>
      availableWallets
        .find((x) => x.connection.type === "TORUS")
        ?.connect(provider),
    [availableWallets]
  );

  if (status === WalletStatus.WALLET_CONNECTED) {
    return (
      <Navigate
        to={`${site.app}/${app.register}/${registerRoutes.wallet}/${routes.submit}`}
      />
    );
  }

  if (status === WalletStatus.INITIALIZING) {
    return <Loader bgColorClass="bg-white" gapClass="gap-2" widthClass="w-4" />;
  }

  return (
    <div className="flex flex-col gap-5 items-center">
      <Title />
      <Web3Auth onLogin={login} />
      <Link
        to={`${site.app}/${app.register}/${registerRoutes.wallet}/${routes.submit}`}
        className="uppercase text-bright-blue text-sm hover:underline mb-5 lg:mb-0"
      >
        Click here if you have a Terra wallet
      </Link>
      <Button
        className="bg-green-400 w-80 h-10"
        onClick={() =>
          navigate(`${site.app}/${app.register}/${registerRoutes.dashboard}`)
        }
      >
        Back to registration dashboard
      </Button>
    </div>
  );
}
