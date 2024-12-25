import { logger } from "helpers";
import { decodeJwt } from "jose";
import { type UserV2, isError } from "types/auth";
import { cognito } from "./cognito";

export const loadAuth = async (): Promise<UserV2 | null> => {
  try {
    /// FROM PERSISTED ///
    if (cognito.token && typeof cognito.token !== "string") {
      return userFromTokens(
        cognito.token.id,
        cognito.token.access,
        cognito.token.refresh
      );
    }

    /// NEAR EXPIRATION ///
    if (cognito.token && typeof cognito.token === "string") {
      const auth = await cognito.refresh(cognito.token);
      if (isError(auth)) return null;

      return userFromTokens(
        auth.AuthenticationResult.IdToken,
        auth.AuthenticationResult.AccessToken,
        auth.AuthenticationResult.RefreshToken
      );
    }

    return null;
  } catch (err) {
    logger.error(err);
    return null;
  }
};

function userFromTokens(
  idToken: string,
  accessToken: string,
  refreshToken: string
): UserV2 {
  const {
    endows = "",
    "cognito:groups": groups = [],
    ...p
  }: any = decodeJwt(idToken);

  return {
    idToken,
    accessToken,
    refreshToken,
    groups,
    endowments: endows.split(",").map(Number) ?? [],
    email: p.email,
    firstName: p.given_name,
    lastName: p.family_name,
    avatar: p["custom:avatar"],
    currency: p["custom:currency"],
  };
}
