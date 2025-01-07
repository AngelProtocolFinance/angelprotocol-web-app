import type { UserEndow } from "@better-giving/user";
import type { UserV2 } from "types/auth";
import { ap, ver } from "../api";

export async function userEndows(user: UserV2): Promise<UserEndow[]> {
  return ap
    .get(`${ver(3)}/users/${user.email}/endowments`, {
      throwHttpErrors: false,
      headers: { authorization: user.idToken },
    })
    .then<UserEndow[]>((res) => (res.ok ? res.json() : []));
}
