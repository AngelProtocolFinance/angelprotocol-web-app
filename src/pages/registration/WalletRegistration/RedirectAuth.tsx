import { useWallet, WalletStatus } from "@terra-money/wallet-provider";
import TorusSdk, { TorusLoginResponse, UX_MODE } from "@toruslabs/customauth";
import Loader from "components/Loader/Loader";
import useRehydrateUserState from "hooks/useRehydrateUserState";
import { useEffect, useMemo, useState } from "react";
import { Redirect, useRouteMatch } from "react-router-dom";
import { toast } from "react-toastify";
import { useSetter } from "store/accessors";
import { app, registration, site } from "types/routes";
import { setConnectedWallet } from "../registrationSlice";
import loadTerraWallet from "./loadTerraWallet";
import { LocalStorageKey } from "./types";

export default function RedirectAuth() {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();
  const { path } = useRouteMatch();
  const { status, network } = useWallet();
  const dispatch = useSetter();

  useRehydrateUserState();

  const torusdirectsdk = useMemo(
    () =>
      new TorusSdk({
        baseUrl: `${window.location.origin}${path}`,
        // user will be redirect to auth page after login
        redirectPathName: "auth",
        enableLogging: true,
        uxMode: UX_MODE.REDIRECT,
        // TODO: change based on chainID used
        network: "testnet",
      }),
    [path]
  );

  useEffect(() => {
    if (status === WalletStatus.INITIALIZING) {
      return;
    }

    async function getResult() {
      try {
        const redirectResult = await torusdirectsdk.getRedirectResult();
        const torusResponse = redirectResult.result as TorusLoginResponse;
        const wallet = loadTerraWallet(torusResponse.privateKey, network);
        dispatch(setConnectedWallet(wallet.key.accAddress));
        // WARNING: this should be safe to remove once Torus is enabled as a connection method to the webapp
        // At that point, this data would be read form the wallet provider
        localStorage.setItem(
          LocalStorageKey.CONNECTED_WALLET_ADDRESS,
          wallet.key.accAddress
        );
      } catch (error) {
        console.log(error);
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    }

    getResult();
  }, [torusdirectsdk, status, network, dispatch]);

  useEffect(() => {
    if (!error) {
      return;
    }

    const isResultFetchError = error.message.includes(
      "Unable to fetch result from redirect"
    );
    if (isResultFetchError) {
      toast.error(
        "Session expired, please repeat the wallet registration process"
      );
    } else {
      toast.error(error.message);
    }
  }, [error]);

  return (
    <div className="h-full">
      {isLoading && (
        <Loader bgColorClass="bg-white" gapClass="gap-2" widthClass="w-4" />
      )}
      {!isLoading && !error && (
        <Redirect
          to={`${site.app}/${app.register}/${registration.register_wallet}`}
        />
      )}
    </div>
  );
}
