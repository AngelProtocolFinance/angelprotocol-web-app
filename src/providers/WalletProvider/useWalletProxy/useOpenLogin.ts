import OpenLogin from "@toruslabs/openlogin";
import { useCallback, useEffect, useState } from "react";
import { useGetter } from "store/accessors";

const openLogin = new OpenLogin({
  clientId: process.env.REACT_APP_WEB_3_AUTH_CLIENT_ID || "",
  network: "testnet",
});

export default function useOpenLogin() {
  const user = useGetter((state) => state.user);
  const [isLoading, setLoading] = useState(true);
  const [privateKey, setPrivateKey] = useState("");

  useEffect(() => {
    async function initializeOpenlogin() {
      setLoading(true);
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
  }, []);

  const connect = useCallback(async () => {
    const loginParams = {
      relogin: true,
      extraLoginOptions: {
        login_hint: user.Email,
      },
    };

    setLoading(true);
    await openLogin.login(loginParams);
    setLoading(false);
  }, [user.Email]);

  const disconnect = useCallback(async () => {
    setLoading(true);
    await openLogin.logout();
    setLoading(false);
  }, []);

  return {
    isLoading,
    privateKey,
    connect,
    disconnect,
  };
}
