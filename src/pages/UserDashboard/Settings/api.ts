import type { UserEndow } from "@better-giving/user";
import type { ActionFunction, LoaderFunction } from "@vercel/remix";
import { ap, ver } from "api/api";
import { userEndows } from "api/get/user-endows";
import type { ActionData } from "types/action";
import type { UserV2 } from "types/auth";
import { cognito, redirectToAuth } from ".server/auth";

export interface SettingsData {
  user: UserV2;
  userEndows: UserEndow[];
}

export const loader: LoaderFunction = async ({ request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return redirectToAuth(request, headers);
  return {
    user,
    userEndows: await userEndows(user),
  } satisfies SettingsData;
};

export const action: ActionFunction = async ({ request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return redirectToAuth(request, headers);

  const path = `${ver(3)}/users/${user.email}/endowments`;
  await ap.patch(path, {
    headers: { authorization: user.idToken },
    json: { alertPrefs: await request.json() },
  });
  return { __ok: "Settings updated" } satisfies ActionData;
};
