import { useWallet, WalletStatus } from "@terra-money/wallet-provider";
import Loader from "components/Loader/Loader";
import { WalletSuiteContext } from "providers/WalletSuiteProvider";
import { useContext } from "react";
import { Redirect, useRouteMatch } from "react-router-dom";
import routes from "../routes";
import useOpenLogin from "../useOpenLogin";
import Title from "./Title";
import Web3Auth from "./Web3Auth";

export default function ChooseWallet() {
  const { setShowConnectors } = useContext(WalletSuiteContext);
  const { isLoading, login } = useOpenLogin();
  const { status, wallets } = useWallet();
  const { path } = useRouteMatch();

  if (status !== WalletStatus.INITIALIZING && !!wallets.length) {
    return <Redirect to={`${path}/${routes.submit}`} />;
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
        Or click here if you already have a Terra wallet that you would like to
        use
      </button>
    </div>
  );
}
