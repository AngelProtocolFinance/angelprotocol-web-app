import { type ActionFunction, data } from "react-router";
import type { ActionData } from "types/action";
import { type UserV2, is_error } from "types/auth";
import type { UserCurrencies } from "types/currency";
import type { Route } from "./+types";
import { cognito, to_auth } from ".server/auth";
import { get_db_currencies } from ".server/currency";

export interface LoaderData extends UserCurrencies {
  user: UserV2;
}

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return to_auth(request, headers);
  const currencies = await get_db_currencies(user.currency);
  return { user, ...currencies } satisfies LoaderData;
};

export const action: ActionFunction = async ({ request }) => {
  const { user, headers, session } = await cognito.retrieve(request);
  if (!user) return to_auth(request, headers);

  const attributes = await request.json();
  const result = await cognito.update_user_attributes(
    attributes,
    user.token_access
  );
  if (result !== "success") throw result.message;

  const res = await cognito.refresh(session);

  if (is_error(res)) throw res.message;

  return data({ __ok: "User profile updated" } satisfies ActionData, {
    headers: {
      "set-cookie": res.commit,
      "x-remix-revalidate": "1",
      "cache-control": "no-cache",
    },
  });
};
