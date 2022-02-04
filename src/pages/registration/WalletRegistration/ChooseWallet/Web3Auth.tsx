import gmailIcon from "assets/images/gmail.png";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BsDiscord } from "react-icons/bs";
import { FaFacebook, FaTwitch } from "react-icons/fa";
import ButtonSocial from "./ButtonSocial";
import ContinueWithEmail from "./ContinueWithEmail";
import PartnerContent from "./PartnerContent";
import TorusSdk, { UX_MODE } from "@toruslabs/customauth";
import { useRouteMatch } from "react-router";
import Loader from "components/Loader/Loader";
import {
  AUTH_DOMAIN,
  EMAIL_PASSWORD,
  GOOGLE,
  LINKEDIN,
  verifierMap,
} from "../constants";

type ConnectionMap = { [key: keyof typeof verifierMap]: any };

const connectionMap: ConnectionMap = {
  [EMAIL_PASSWORD]: { domain: AUTH_DOMAIN },
  [LINKEDIN]: { domain: AUTH_DOMAIN },
};

export default function Web3Auth() {
  const [isLoading, setLoading] = useState(true);
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

  const initializeTorus = useCallback(async () => {
    try {
      setLoading(true);
      await torusdirectsdk.init({ skipSw: true });
    } catch (error) {
      console.error(error, "mounted caught");
    } finally {
      setLoading(false);
    }
  }, [torusdirectsdk]);

  useEffect(() => {
    initializeTorus();
  }, [initializeTorus]);

  const login = useCallback(
    async (selectedVerifier: string) => {
      try {
        const jwtParams = connectionMap[selectedVerifier] || {};
        const { typeOfLogin, clientId, verifier } =
          verifierMap[selectedVerifier];
        // in redirect mode, login result will be handled in redirect page
        // (Check auth.tsx file)
        await torusdirectsdk?.triggerLogin({
          typeOfLogin,
          verifier,
          clientId,
          jwtParams,
        });
      } catch (error) {
        console.error(error, "login caught");
      }
    },
    [torusdirectsdk]
  );

  if (isLoading) {
    return <Loader bgColorClass="bg-white" gapClass="gap-2" widthClass="w-4" />;
  }

  return (
    <div className="flex flex-col justify-between bg-angel-blue h-96 w-96 p-4 rounded-sm">
      <ButtonSocial onClick={() => login(GOOGLE)}>
        <img src={gmailIcon} alt="Google" height={30} width={30} />
        <span className="text-gray-500">Continue with Google</span>
      </ButtonSocial>

      <div className="flex justify-between gap-4">
        <ButtonSocial onClick={() => console.log("connect with Facebook")}>
          <FaFacebook className="text-blue-accent" size={30} />
        </ButtonSocial>
        <ButtonSocial onClick={() => console.log("connect with Twitch")}>
          <FaTwitch className="text-purple-500" size={30} />
        </ButtonSocial>
        <ButtonSocial onClick={() => console.log("connect with Discord")}>
          <BsDiscord className="text-purple-600" size={30} />
        </ButtonSocial>
      </div>

      <Separator />

      <ContinueWithEmail
        onClick={(value: string) => console.log(`continue with Email ${value}`)}
      />

      <PartnerContent />
    </div>
  );
}

function Separator() {
  return (
    <div className="flex gap-3 items-center">
      <span className="h-px w-full bg-white" />
      <span>or</span>
      <span className="h-px w-full bg-white" />
    </div>
  );
}
