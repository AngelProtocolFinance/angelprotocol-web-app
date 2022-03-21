import { useWallet, WalletStatus } from "@terra-money/wallet-provider";
import Loader from "components/Loader/Loader";
import { registerRootPath } from "pages/Registration/routes";
import { WalletSuiteContext } from "providers/WalletSuiteProvider";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import routes from "../routes";
import { default as registerRoutes } from "../../routes";
import Title from "./Title";
import Web3Auth from "./Web3Auth";

export default function ChooseWallet() {
  const navigate = useNavigate();
  const { setConnectOptionsShown } = useContext(WalletSuiteContext);
  const {
    torus: { isLoading, login },
  } = useContext(WalletSuiteContext);
  const { status, wallets } = useWallet();

  useEffect(() => {
    const isWalletConnected =
      !isLoading && status !== WalletStatus.INITIALIZING && !!wallets.length;
    if (isWalletConnected) {
      navigate(`${registerRootPath}/${registerRoutes.wallet}/${routes.submit}`);
    }
  }, [isLoading, status, wallets?.length, navigate]);

  if (isLoading) {
    return <Loader bgColorClass="bg-white" gapClass="gap-2" widthClass="w-4" />;
  }

  return (
    <div className="flex flex-col gap-5 items-center">
      <Title />
      <Web3Auth onLogin={login} />
      <button
        onClick={() => setConnectOptionsShown(true)}
        className="uppercase text-bright-blue text-sm hover:underline mb-5 lg:mb-0"
      >
        Click here if you have a Terra wallet
      </button>
    </div>
  );
}
