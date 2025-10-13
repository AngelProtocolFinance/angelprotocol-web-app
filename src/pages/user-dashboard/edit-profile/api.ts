import { type ActionFunction, data } from "react-router";
import type { ActionData } from "types/action";
import { type UserV2, is_error } from "types/auth";
import type { ICurrenciesFv } from "types/currency";
import type { Route } from "./+types";
import { cognito, to_auth } from ".server/auth";
import { table } from ".server/aws/db";
import { to_currencies_fv } from ".server/helpers/currency";
import { stripe } from ".server/sdks";

export interface LoaderData extends ICurrenciesFv {
  user: UserV2;
}

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return to_auth(request, headers);

  const { supported_payment_currencies } =
    await stripe.countrySpecs.retrieve("US");

  const currencies_fv = to_currencies_fv(
    user.currency,
    supported_payment_currencies,
    await table.currency_map("Usd").then((x) => x.all)
  );

  return { user, ...currencies_fv } satisfies LoaderData;
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
