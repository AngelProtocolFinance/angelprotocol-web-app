import { useWallet } from "@terra-money/wallet-provider";
import OpenLogin from "@toruslabs/openlogin";
import { chainIDs } from "constants/chainIDs";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouteMatch } from "react-router";
import { useGetter } from "store/accessors";
import routes from "./routes";

export default function useOpenLogin() {
  const user = useGetter((state) => state.user);
  const [isLoading, setLoading] = useState(true);
  const [privateKey, setPrivateKey] = useState("");
  const { path } = useRouteMatch();
  const { network } = useWallet();
  const openlogin = useMemo(
    () =>
      new OpenLogin({
        clientId: process.env.REACT_APP_WEB_3_AUTH_CLIENT_ID || "",
        network: network.chainID === chainIDs.mainnet ? "mainnet" : "testnet",
      }),
    [network]
  );

  useEffect(() => {
    setLoading(true);
    async function initializeOpenlogin() {
      await openlogin.init();
      if (openlogin.privKey) {
        setPrivateKey(openlogin.privKey);
      }
      setLoading(false);
    }

    initializeOpenlogin();
  }, [openlogin]);

  const login = useCallback(
    async (loginProvider: string) => {
      try {
        await openlogin.login({
          loginProvider: loginProvider,
          redirectUrl: `${window.location.origin}${path}/${routes.auth}`,
          relogin: true,
          extraLoginOptions: {
            login_hint: user.Email,
          },
        });
      } catch (error) {
        console.error("error", error);
      }
    },
    [openlogin, path, user.Email]
  );

  return {
    isLoading,
    privateKey,
    login,
  };
}
