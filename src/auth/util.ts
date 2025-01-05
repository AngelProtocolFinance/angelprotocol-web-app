import { decodeJwt } from "jose";
import type { UserV2 } from "types/auth";
import type { Stored, Token } from "./session";

export class Util {
  toUser(token: Token): UserV2 {
    const {
      endows = "",
      "cognito:groups": groups = [],
      ...p
    }: any = decodeJwt(token.bg_token_id);

    return {
      idToken: token.bg_token_id,
      accessToken: token.bg_token_access,
      refreshToken: token.bg_token_refresh,
      groups,
      endowments: endows.split(",").map(Number) ?? [],
      email: p.email,
      firstName: p.given_name,
      lastName: p.family_name,
      avatar: p["custom:avatar"],
      currency: p["custom:currency"],
    };
  }
  unset(session: Stored) {
    session.unset("bg_token_id");
    session.unset("bg_token_access");
    session.unset("bg_token_refresh");
    session.unset("bg_token_expiry");
  }
}
