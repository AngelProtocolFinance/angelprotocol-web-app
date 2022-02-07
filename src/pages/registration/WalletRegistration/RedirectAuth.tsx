import TorusSdk, {
  RedirectResult,
  TorusLoginResponse,
  UX_MODE,
} from "@toruslabs/customauth";
import { useEffect, useMemo, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { LCDClient, Wallet } from "@terra-money/terra.js";
import { RawKey } from "@terra-money/terra.js";

const KEY =
  "2c89e31e1109e1423f0b4b463ca73709755c80f97a2899dabf61bc299167ad8dmxQwVCruQ11cEbGLKuK84EykrdrCPOl7if34xD71x3TxHoUc6AyUiGpPYCRJ/50m/b3bLp8NX5RPcEreyqDQrj1Ykub056/fDXgQDOQPkCM=";

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

  const terra = useMemo(
    () =>
      new LCDClient({
        URL: "https://bombay-lcd.terra.dev",
        chainID: "bombay-12",
      }),
    []
  );

  useEffect(() => {
    async function getResult() {
      const temp = localStorage.getItem("result");
      let result = temp && (JSON.parse(temp) as TorusLoginResponse);

      if (!result) {
        const redirectResult = await torusdirectsdk.getRedirectResult();
        setLoginDetails(redirectResult);
        result = redirectResult.result as TorusLoginResponse;
        localStorage.setItem("result", JSON.stringify(result));
      }

      console.log("result", result);
      const w = terra.wallet(new RawKey(Buffer.from(KEY, "hex")));
      // const w = terra.wallet(new RawKey(Buffer.from(result.privateKey)));
      console.log("w", w.key.accAddress);
    }

    getResult();
  }, [torusdirectsdk, terra]);

  return (
    <div>
      <h1>This is the redirected page</h1>
    </div>
  );
}
