import { Wallet } from "@terra-money/terra.js";
import { useWallet, WalletStatus } from "@terra-money/wallet-provider";
import TorusSdk, { TorusLoginResponse, UX_MODE } from "@toruslabs/customauth";
import Loader from "components/Loader/Loader";
import { useEffect, useMemo, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { app, registration, site } from "types/routes";
import loadTerraWallet from "./loadTerraWallet";

export default function RedirectAuth() {
  const { path } = useRouteMatch();
  const [isLoading, setLoading] = useState(true);
  const [torusWallet, setTorusWallet] = useState<Wallet>();
  const [error, setError] = useState<Error>();
  const { status, network } = useWallet();

  const torusdirectsdk = useMemo(
    () =>
      new TorusSdk({
        baseUrl: `${window.location.origin}${path}`,
        // user will be redirect to auth page after login
        redirectPathName: "auth",
        enableLogging: true,
        uxMode: UX_MODE.REDIRECT,
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
        setTorusWallet(wallet);
      } catch (error) {
        console.log(error);
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    }

    getResult();
  }, [torusdirectsdk, status, network]);

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

  if (isLoading) {
    return (
      <div className="h-full">
        <Loader bgColorClass="bg-white" gapClass="gap-2" widthClass="w-4" />
      </div>
    );
  }

  return (
    <div className="h-full">
      <h1>Your wallet: {torusWallet?.key.accAddress}</h1>
      <Link
        to={`${site.app}/${app.register}/${registration.wallet_check}`}
        className="uppercase text-bright-blue text-sm hover:underline"
      >
        Click here to go to wallet creation screen
      </Link>
      <ToastContainer />
    </div>
  );
}
