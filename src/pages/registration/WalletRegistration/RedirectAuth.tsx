import TorusSdk, {
  RedirectResult,
  TorusLoginResponse,
  UX_MODE,
} from "@toruslabs/customauth";
import { useEffect, useMemo, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import useGetTerraWallet from "./useGetTerraWallet";

export default function RedirectAuth() {
  const { path } = useRouteMatch();
  const [loginDetails, setLoginDetails] = useState<RedirectResult>();
  const getTerraWallet = useGetTerraWallet();

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
    async function getResult() {
      // TODO - DELETE THIS LOGIC BEFORE PR
      const temp = localStorage.getItem("result");
      let result = temp && (JSON.parse(temp) as TorusLoginResponse);
      // ---

      if (!result) {
        const redirectResult = await torusdirectsdk.getRedirectResult();
        setLoginDetails(redirectResult);
        result = redirectResult.result as TorusLoginResponse;
        localStorage.setItem("result", JSON.stringify(result));
      }

      console.log("result", result);
      const wallet = getTerraWallet(result.privateKey);
      console.log("w", wallet.key.accAddress);
    }

    getResult();
  }, [torusdirectsdk, getTerraWallet]);

  return (
    <div>
      <h1>This is the redirected page</h1>
    </div>
  );
}
