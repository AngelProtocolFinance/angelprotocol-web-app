import { decodeJwt } from "jose";
import type { UserV2 } from "types/auth";
import type { SessionData, Stored } from "./session";

export class Util {
  protected to_user(data: SessionData): UserV2 {
    const {
      endows = "",
      funds = "",
      "cognito:groups": groups = [],
      ...p
    }: any = decodeJwt(data.token_id);

    return {
      token_id: data.token_id,
      token_access: data.token_access,
      token_refresh: data.token_refresh,
      groups,
      endowments: endows.split(",").map(Number) ?? [],
      funds: funds.split(",") ?? [],
      email: p.email,
      first_name: p.given_name,
      last_name: p.family_name,
      avatar: p["custom:avatar"],
      currency: p["custom:currency"],
      referral_id: p["custom:referral_id"],
      pay_id: p["custom:pay_id"],
      pay_min: p["custom:pay_min"],
      stripe_customer_id: p["custom:stripe_customer_id"],
      w_form: p["custom:w_form"],
    };
  }
  protected unset(session: Stored) {
    session.unset("token_id");
    session.unset("token_access");
    session.unset("token_refresh");
    session.unset("token_expiry");
  }
}
