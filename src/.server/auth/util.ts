import { decodeJwt } from "jose";
import type { UserV2 } from "types/auth";
import type { SessionData, Stored } from "./session";

export class Util {
  protected toUser(data: SessionData): UserV2 {
    const {
      endows = "",
      funds = "",
      "cognito:groups": groups = [],
      ...p
    }: any = decodeJwt(data.token_id);

    return {
      idToken: data.token_id,
      accessToken: data.token_access,
      refreshToken: data.token_refresh,
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
  protected unset(session: Stored) {
    session.unset("token_id");
    session.unset("token_access");
    session.unset("token_refresh");
    session.unset("token_expiry");
  }
}
