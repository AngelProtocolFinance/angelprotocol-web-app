import { useWallet, WalletStatus } from "@terra-money/wallet-provider";
import Loader from "components/Loader/Loader";
import useRehydrateUserState from "hooks/useRehydrateUserState";
import { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSetter } from "store/accessors";
import { app, registration, site } from "types/routes";
import { setConnectedWallet } from "../registrationSlice";
import useOpenLogin from "./ChooseWallet/useOpenLogin";
import loadTerraWallet from "./loadTerraWallet";
import { LocalStorageKey } from "./types";

export default function RedirectAuth() {
  const { status, network } = useWallet();
  const { isLoading, privateKey } = useOpenLogin();
  const dispatch = useSetter();

  useRehydrateUserState();

  useEffect(() => {
    if (status === WalletStatus.INITIALIZING || !privateKey) {
      return;
    }

    const wallet = loadTerraWallet(privateKey, network);
    dispatch(setConnectedWallet(wallet.key.accAddress));
    // WARNING: this should be safe to remove once Torus is enabled as a connection method to the webapp
    // At that point, this data would be read form the wallet provider
    localStorage.setItem(
      LocalStorageKey.CONNECTED_WALLET_ADDRESS,
      wallet.key.accAddress
    );
  }, [privateKey, status, network, dispatch]);

  return (
    <div className="h-full">
      {isLoading ? (
        <Loader bgColorClass="bg-white" gapClass="gap-2" widthClass="w-4" />
      ) : (
        <Redirect
          to={`${site.app}/${app.register}/${registration.register_wallet}`}
        />
      )}
    </div>
  );
}
