import { useWallet } from "@terra-money/wallet-provider";
import OpenLogin from "@toruslabs/openlogin";
import { chainIDs } from "constants/chainIDs";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useGetter } from "store/accessors";

export default function useTorus(defaultRedirectUrl: string) {
  const user = useGetter((state) => state.user);
  const [isLoading, setLoading] = useState(true);
  const [privateKey, setPrivateKey] = useState("");
  const { network } = useWallet();
  const openLogin = useMemo(
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
      await openLogin.init();
      // when using 'redirect' uxMode, this field will contain the private key value after redirect
      // NOTE: to successfully read this value, it is necessary to call this hook in the component
      // that is Torus is set to redirect to, otherwise this value would be empty
      if (openLogin.privKey) {
        setPrivateKey(openLogin.privKey);
      }
      setLoading(false);
    }

    initializeOpenlogin();
  }, [openLogin]);

  const login = useCallback(
    async (loginProvider: string = "", redirectUrl: string = "") => {
      try {
        const result = await openLogin.login({
          loginProvider: loginProvider,
          redirectUrl: redirectUrl || defaultRedirectUrl,
          relogin: true,
          extraLoginOptions: {
            login_hint: user.Email,
          },
        });

        if (!!result?.privKey && typeof result.privKey === "string") {
          console.log("login privKey", result.privKey);
          setPrivateKey(result.privKey);
        }
      } catch (error) {
        console.error("error", error);
      }
    },
    [openLogin, defaultRedirectUrl, user.Email]
  );

  return {
    isLoading,
    privateKey,
    login,
  };
}
