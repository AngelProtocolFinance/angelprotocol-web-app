import { decodeJwt } from "jose";
import type { UserV2 } from "types/auth";
import type { Token } from "./session";

export function userFromToken(token: Token): UserV2 {
  const {
    endows = "",
    funds = "",
    "cognito:groups": groups = [],
    ...p
  }: any = decodeJwt(token.bg_token_id);

  return {
    idToken: token.bg_token_id,
    accessToken: token.bg_token_access,
    refreshToken: token.bg_token_refresh,
    groups,
    endowments: endows.split(",").map(Number) ?? [],
    funds: funds.split(",") ?? [],
    email: p.email,
    firstName: p.given_name,
    lastName: p.family_name,
    avatar: p["custom:avatar"],
    currency: p["custom:currency"],
  };
}
