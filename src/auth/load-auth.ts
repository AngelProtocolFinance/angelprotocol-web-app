import { appRoutes } from "constants/routes";
import { logger } from "helpers";
import { decodeJwt } from "jose";
import { redirect } from "react-router-dom";
import type { OAuthState, UserV2 } from "types/auth";
import { cognito, isError, oauth } from "./cognito";

const key = "bg_session";
const session = {
  get: () => sessionStorage.getItem(key),
  save: (session: string) => sessionStorage.setItem(key, session),
};

const protectedPaths: string[] = [
  appRoutes.admin,
  appRoutes.register,
  appRoutes.applications,
  appRoutes.banking_applications,
];

type AuthRes = Response | UserV2 | null;

export const loadAuth = async (request: Request): Promise<AuthRes> => {
  try {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");

    //handle oauth callback
    if (code && state) {
      const res = await oauth.exchange(code);
      if (!res) return redirect(url.toString());

      //persist refresh token
      session.save(res.refresh_token);

      //redirect to requestor
      const parsed = JSON.parse(window.atob(state)) as OAuthState;
      url.searchParams.delete("code");
      url.searchParams.delete("state");

      url.pathname = parsed.pathname;
      if (parsed.data && typeof parsed.data === "object") {
        url.searchParams.append("_s", btoa(JSON.stringify(parsed.data)));
      }

      //TODO send this data to the redirect route
      //const user = userFromIdToken(res.id_token, res.access_token);
      return redirect(url.toString());
    }

    const sesh = session.get();
    // retrieve user
    if (sesh) {
      const auth = await cognito.refresh(sesh);
      if (isError(auth)) return null;

      session.save(auth.AuthenticationResult.RefreshToken);
      return userFromIdToken(
        auth.AuthenticationResult.IdToken,
        auth.AuthenticationResult.AccessToken
      );
    }

    // check if protected path
    if (protectedPaths.includes(url.pathname)) {
      return redirect(appRoutes.signup);
    }

    return null;
  } catch (err) {
    logger.error(err);
    return null;
  }
};

function userFromIdToken(idToken: string, accessToken: string): UserV2 {
  const {
    endows = "",
    "cognito:groups": groups = [],
    ...p
  }: any = decodeJwt(idToken);

  return {
    idToken,
    accessToken,
    groups,
    endowments: endows.split(",").map(Number) ?? [],
    email: p.email,
    firstName: p.given_name,
    lastName: p.family_name,
    avatar: p["custom:avatar"],
    currency: p["custom:currency"],
  };
}

export const userRes = (res: AuthRes): res is UserV2 => {
  return res !== null && "idToken" in res;
};
