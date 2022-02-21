import Loader from "components/Loader/Loader";
import useRehydrateUserState from "hooks/useRehydrateUserState";
import { useEffect } from "react";
import { Redirect, useRouteMatch } from "react-router-dom";
import routes from "./routes";
import useEntropyToTerraWallet from "./useEntropyToTerraWallet";
import useOpenLogin from "./useOpenLogin";

export default function Auth() {
  const { isLoading, privateKey } = useOpenLogin();
  const { path } = useRouteMatch();
  const entropyToTerraWallet = useEntropyToTerraWallet();

  // We've been redirected here from a third-party login provider, we should assume
  // user state needs to be rehydrated
  useRehydrateUserState();

  // (2022-02-21)
  // this flow (using entropyToTerraWallet) will need to be updated once Torus is enabled
  // as a connection method for the whole app to set Torus as connected wallet
  useEffect(() => {
    if (!isLoading) {
      const address = entropyToTerraWallet(privateKey).key.accAddress;

      // TODO: set Torus as connected wallet
      console.log(address);
    }
  }, [privateKey, isLoading, entropyToTerraWallet]);

  return isLoading ? (
    <Loader bgColorClass="bg-white-grey" gapClass="gap-2" widthClass="w-4" />
  ) : (
    <Redirect to={`${path}/${routes.submit}`} />
  );
}
