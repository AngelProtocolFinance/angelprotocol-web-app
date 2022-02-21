import Loader from "components/Loader/Loader";
import useRehydrateUserState from "hooks/useRehydrateUserState";
import { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import routes from "./routes";
import useEntropyToTerraWallet from "./useEntropyToTerraWallet";
import { WalletRegistrationContext } from "./WalletRegistrationProvider";

export default function Auth() {
  const { rootPath, isLoading, openLoginPrivateKey } = useContext(
    WalletRegistrationContext
  );
  const entropyToTerraWallet = useEntropyToTerraWallet();

  // We've been redirected here from a third-party login provider, we should assume
  // user state needs to be rehydrated
  useRehydrateUserState();

  // (2022-02-21)
  // this flow (using entropyToTerraWallet) will need to be updated once Torus is enabled
  // as a connection method for the whole app to set Torus as connected wallet
  useEffect(() => {
    if (!isLoading && openLoginPrivateKey) {
      const address = entropyToTerraWallet(openLoginPrivateKey).key.accAddress;

      // TODO: set Torus as connected wallet
      console.log(address);
    }
  }, [openLoginPrivateKey, isLoading, entropyToTerraWallet]);

  return isLoading ? (
    <Loader bgColorClass="bg-white-grey" gapClass="gap-2" widthClass="w-4" />
  ) : (
    <Redirect to={`${rootPath}/${routes.submit}`} />
  );
}
