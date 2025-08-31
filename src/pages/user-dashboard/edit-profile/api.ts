import { type ActionFunction, type LoaderFunction, data } from "react-router";
import type { ActionData } from "types/action";
import { type UserV2, isError } from "types/auth";
import type { UserCurrencies } from "types/currency";
import { cognito, toAuth } from ".server/auth";
import { get_db_currencies } from ".server/currency";

export interface LoaderData extends UserCurrencies {
  user: UserV2;
}

export const loader: LoaderFunction = async ({ request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);
  const currencies = await get_db_currencies(user.currency);
  return { user, ...currencies } satisfies LoaderData;
};

export const action: ActionFunction = async ({ request }) => {
  const { user, headers, session } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  const attributes = await request.json();
  const result = await cognito.updateUserAttributes(
    attributes,
    user.accessToken
  );
  if (result !== "success") throw result.message;

  const res = await cognito.refresh(session);

  if (isError(res)) throw res.message;

  return data({ __ok: "User profile updated" } satisfies ActionData, {
    headers: {
      "Set-Cookie": res.commit,
      "X-Remix-Revalidate": "1",
      "Cache-Control": "no-cache",
    },
  });
};
