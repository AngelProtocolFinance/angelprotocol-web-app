import { type ActionFunction, type LoaderFunction, data } from "@vercel/remix";
import {
  type FiatCurrencies,
  getFiatCurrencies,
} from "api/get/fiat-currencies";
import { cognito, redirectToAuth } from "auth";
import type { ActionData } from "types/action";
import { type UserV2, isError } from "types/auth";

export interface LoaderData extends FiatCurrencies {
  user: UserV2;
}

export const loader: LoaderFunction = async ({ request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return redirectToAuth(request, headers);
  const currencies = await getFiatCurrencies(user.currency ?? "none");
  return { user, ...currencies } satisfies LoaderData;
};

export const action: ActionFunction = async ({ request }) => {
  const { user, headers, session } = await cognito.retrieve(request);
  if (!user) return redirectToAuth(request, headers);

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
      "Set-Cookie": res,
      "X-Remix-Revalidate": "1",
      "Cache-Control": "no-cache",
    },
  });
};
