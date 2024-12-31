import { ap, ver } from "api/api";
import { userEndows } from "api/get/user-endows";
import { loadAuth, redirectToAuth } from "auth";
import type { ActionFunction, LoaderFunction } from "react-router";
import type { UserV2 } from "types/auth";
import type { UserEndow } from "types/aws";

export { default } from "./Settings";

export const clientLoader: LoaderFunction = async ({ request }) => {
  const auth = await loadAuth();
  if (!auth) return redirectToAuth(request);
  return {
    user: auth,
    userEndows: await userEndows(auth),
  } satisfies SettingsData;
};

export const clientAction: ActionFunction = async ({ request }) => {
  const auth = await loadAuth();
  if (!auth) return redirectToAuth(request);

  const path = `${ver(3)}/users/${auth.email}/endowments`;
  const res = await ap.patch(path, {
    headers: { authorization: auth.idToken },
    json: { alertPrefs: await request.json() },
  });
  return { ok: res.ok };
};

export interface SettingsData {
  user: UserV2;
  userEndows: UserEndow[];
}
