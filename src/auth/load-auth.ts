import { logger } from "helpers";
import { decodeJwt } from "jose";
import { type UserV2, isError } from "types/auth";
import { cognito } from "./cognito";

export const loadAuth = async (): Promise<UserV2 | null> => {
  try {
    /// FROM PERSISTED ///
    if (cognito.token && typeof cognito.token !== "string") {
      return userFromIdToken(cognito.token.id, cognito.token.access);
    }

    /// NEAR EXPIRATION ///
    if (cognito.token && typeof cognito.token === "string") {
      const auth = await cognito.refresh(cognito.token);
      if (isError(auth)) return null;

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
