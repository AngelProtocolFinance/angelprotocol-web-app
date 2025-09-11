import { Txs as Txis } from "@better-giving/db";
import type { ActionFunction, LoaderFunction } from "react-router";
import type { ActionData } from "types/action";
import type { UserV2 } from "types/auth";
import type { IUserNpo2 } from "types/user";
import { parse } from "valibot";
import { alert_prefs } from "./schema";
import { cognito, toAuth } from ".server/auth";
import { TransactWriteCommand, userdb } from ".server/aws/db";
import { user_npos } from ".server/user";

export interface SettingsData {
  user: UserV2;
  user_npos: IUserNpo2[];
}

export const loader: LoaderFunction = async ({ request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  return {
    user,
    user_npos: await user_npos(user.email),
  } satisfies SettingsData;
};

export const action: ActionFunction = async ({ request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  const prefs = parse(alert_prefs, await request.json());
  const txis = new Txis();
  for (const { npo, ...p } of prefs) {
    txis.update(userdb.userxnpo_update_txi(npo, user.email, { alertPref: p }));
  }

  const cmd = new TransactWriteCommand({
    TransactItems: txis.all,
  });
  await userdb.client.send(cmd);
  return { __ok: "Settings updated" } satisfies ActionData;
};
