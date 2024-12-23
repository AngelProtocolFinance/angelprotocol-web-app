import { userEndows } from "api/get/user-endows";
import { loadAuth, redirectToAuth } from "auth";
import type { LoaderFunction } from "react-router-dom";
import type { UserV2 } from "types/auth";
import type { UserEndow } from "types/aws";

export { Settings as Component } from "./Settings";

export const loader: LoaderFunction = async ({ request }) => {
  const auth = await loadAuth();
  if (!auth) return redirectToAuth(request);
  return {
    user: auth,
    userEndows: await userEndows(auth),
  } satisfies SettingsData;
};

export interface SettingsData {
  user: UserV2;
  userEndows: UserEndow[];
}
