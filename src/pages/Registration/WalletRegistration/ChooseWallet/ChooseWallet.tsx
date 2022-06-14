import { useCallback } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button } from "pages/Registration/common";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import isTerraProvider from "contexts/WalletContext/helpers/isTerraProvider";
import Loader from "components/Loader";
import { appRoutes, siteRoutes } from "constants/routes";
import { default as registerRoutes } from "../../routes";
import routes from "../routes";
import Title from "./Title";
import Web3Auth from "./Web3Auth";

export default function ChooseWallet() {
  const navigate = useNavigate();
  const { wallet, isProviderLoading } = useGetWallet();

  if (
    isProviderLoading /** providers are initializing, or some is trying to reconnect.
    once done, wallet address is available and may not need to wait for balance fetching */
  ) {
    return <Loader bgColorClass="bg-white" gapClass="gap-2" widthClass="w-4" />;
  }

  //a terra wallet is connected
  if (wallet && isTerraProvider(wallet.providerId)) {
    return (
      <Navigate
        to={`${siteRoutes.app}/${appRoutes.register}/${registerRoutes.wallet}/${routes.submit}`}
      />
    );
  }

  //non terra wallet is connected
  if (wallet && !isTerraProvider(wallet.providerId)) {
    return (
      <div className="flex flex-col gap-3">
        <p>Only Terra compatible wallets are allowed!</p>
        <p>Please connect your Terra wallet</p>
      </div>
    );
  }

  //wallet is not connected
  return (
    <div className="flex flex-col gap-5 items-center">
      <Title />
      <Web3Auth />
      <Link
        to={`${siteRoutes.app}/${appRoutes.register}/${registerRoutes.wallet}/${routes.submit}`}
        className="uppercase text-bright-blue text-sm hover:underline mb-5 lg:mb-0"
      >
        Click here if you have a Terra wallet
      </Link>
      <Button
        className="bg-green-400 w-80 h-10"
        onClick={() =>
          navigate(
            `${siteRoutes.app}/${appRoutes.register}/${registerRoutes.dashboard}`
          )
        }
      >
        Back to registration dashboard
      </Button>
    </div>
  );
}
