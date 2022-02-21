import { useWallet, WalletStatus } from "@terra-money/wallet-provider";
import Loader from "components/Loader/Loader";
import { WalletSuiteContext } from "providers/WalletSuiteProvider";
import { useContext } from "react";
import { Redirect } from "react-router-dom";
import { WalletRegistrationContext } from "..";
import routes from "../routes";
import useOpenLogin from "../useOpenLogin";
import Title from "./Title";
import Web3Auth from "./Web3Auth";

export default function ChooseWallet() {
  const { setShowConnectors } = useContext(WalletSuiteContext);
  const { rootPath } = useContext(WalletRegistrationContext);
  const { isLoading, login } = useOpenLogin();
  const { status, wallets } = useWallet();

  if (status !== WalletStatus.INITIALIZING && !!wallets.length) {
    return <Redirect to={`${rootPath}/${routes.submit}`} />;
  }

  if (isLoading) {
    return <Loader bgColorClass="bg-white" gapClass="gap-2" widthClass="w-4" />;
  }

  return (
    <div className="flex flex-col gap-5 items-center">
      <Title />
      <Web3Auth onLogin={login} />
      <button
        onClick={() => setShowConnectors(true)}
        className="uppercase text-bright-blue text-sm hover:underline mb-5 lg:mb-0"
      >
        Click here if you have a Terra wallet
      </button>
    </div>
  );
}
