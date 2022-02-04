import TorusSdk, { RedirectResult, UX_MODE } from "@toruslabs/customauth";
import { useEffect, useMemo, useState } from "react";
import { useRouteMatch } from "react-router-dom";

export default function RedirectAuth() {
  const [loginDetails, setLoginDetails] = useState<RedirectResult>();

  const { path } = useRouteMatch();
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
      const redirectResult = await torusdirectsdk.getRedirectResult();
      setLoginDetails(redirectResult);
      console.log(redirectResult);
    }

    getResult();
  }, []);

  return (
    <div>
      <h1>This is the redirected page</h1>
    </div>
  );
}
