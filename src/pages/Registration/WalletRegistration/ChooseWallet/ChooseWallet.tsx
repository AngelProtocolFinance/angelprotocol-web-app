import { useWallet, WalletStatus } from "@terra-money/wallet-provider";
import Loader from "components/Loader/Loader";
import { WalletSuiteContext } from "providers/WalletSuiteProvider";
import { useContext } from "react";
import { Redirect } from "react-router-dom";
import routes from "../routes";
import { WalletRegistrationContext } from "../WalletRegistrationProvider";
import Title from "./Title";
import Web3Auth from "./Web3Auth";

export default function ChooseWallet() {
  const { setShowConnectors } = useContext(WalletSuiteContext);
  const { rootPath, isLoading, loginWithOpenLogin } = useContext(
    WalletRegistrationContext
  );
  const { status, wallets } = useWallet();

  if (!isLoading && status !== WalletStatus.INITIALIZING && !!wallets.length) {
    return <Redirect to={`${rootPath}/${routes.submit}`} />;
  }

  if (isLoading) {
    return <Loader bgColorClass="bg-white" gapClass="gap-2" widthClass="w-4" />;
  }

  return (
    <div className="flex flex-col gap-5 items-center">
      <Title />
      <Web3Auth onLogin={loginWithOpenLogin} />
      <button
        onClick={() => setShowConnectors(true)}
        className="uppercase text-bright-blue text-sm hover:underline mb-5 lg:mb-0"
      >
        Click here if you have a Terra wallet
      </button>
    </div>
  );
}
