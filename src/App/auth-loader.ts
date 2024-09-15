import { logger } from "helpers";
import { cognito, isError, oauth } from "helpers/cognito";
import { decodeJwt } from "jose";
import type { LoaderFunction } from "react-router-dom";
import type { UserV2 } from "types/auth";

const key = "bg_session";
const session = {
  get: () => sessionStorage.getItem(key),
  save: (session: string) => sessionStorage.setItem(key, session),
};

export const authLoader: LoaderFunction = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    //handle oauth callback
    if (code && state) {
      const res = await oauth.exchange(code);
      if (!res) return null;
      session.save(res.refresh_token);
      return userFromIdToken(res.id_token, res.access_token);
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
