import type { UserEndow } from "@better-giving/user";
import type { ActionFunction, LoaderFunction } from "@vercel/remix";
import { ap, ver } from "api/api";
import type { ActionData } from "types/action";
import type { UserV2 } from "types/auth";
import { cognito, toAuth } from ".server/auth";
import { getUserNpos } from ".server/user-npos";

export interface SettingsData {
  user: UserV2;
  userEndows: UserEndow[];
}

export const loader: LoaderFunction = async ({ request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);
  return {
    user,
    userEndows: await getUserNpos(user.email),
  } satisfies SettingsData;
};

export const action: ActionFunction = async ({ request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  const path = `${ver(3)}/users/${user.email}/endowments`;
  await ap.patch(path, {
    headers: { authorization: user.idToken },
    json: { alertPrefs: await request.json() },
  });
  return { __ok: "Settings updated" } satisfies ActionData;
};
