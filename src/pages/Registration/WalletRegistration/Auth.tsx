import Loader from "components/Loader/Loader";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerRootPath } from "../routes";
import routes from "./routes";
import { default as registerRoutes } from "../routes";
import useEntropyToTerraWallet from "./useEntropyToTerraWallet";
import { WalletSuiteContext } from "providers/WalletSuiteProvider";

export default function Auth() {
  const navigate = useNavigate();
  const {
    torus: { isLoading, privateKey },
  } = useContext(WalletSuiteContext);
  const entropyToTerraWallet = useEntropyToTerraWallet();

  // (2022-02-21)
  // this flow (using entropyToTerraWallet) will need to be updated once Torus is enabled
  // as a connection method for the whole app to set Torus as connected wallet
  useEffect(() => {
    if (!isLoading && privateKey) {
      const address = entropyToTerraWallet(privateKey).key.accAddress;

      // TODO: set Torus as connected wallet
      console.log(address);
    }
  }, [privateKey, isLoading, entropyToTerraWallet]);

  useEffect(() => {
    if (!isLoading) {
      navigate(`${registerRootPath}/${registerRoutes.wallet}/${routes.submit}`);
    }
  }, [isLoading, navigate]);

  return (
    <Loader bgColorClass="bg-white-grey" gapClass="gap-2" widthClass="w-4" />
  );
}
