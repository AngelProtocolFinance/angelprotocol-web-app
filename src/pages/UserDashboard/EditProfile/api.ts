import type { ActionFunction, LoaderFunction } from "@remix-run/react";
import {
  type FiatCurrencies,
  getFiatCurrencies,
} from "api/get/fiat-currencies";
import { cognito, loadAuth, redirectToAuth } from "auth";
import { type UserV2, isError } from "types/auth";

export interface LoaderData extends FiatCurrencies {
  user: UserV2;
}

export const clientLoader: LoaderFunction = async ({ request }) => {
  const auth = await loadAuth();
  if (!auth) return redirectToAuth(request);
  const currencies = await getFiatCurrencies(auth);
  return { user: auth, ...currencies } satisfies LoaderData;
};

export const clientAction: ActionFunction = async ({ request }) => {
  const auth = await loadAuth();
  if (!auth) return redirectToAuth(request);

  const attributes = await request.json();
  const result = await cognito.updateUserAttributes(
    attributes,
    auth.accessToken
  );
  if (result !== "success") throw result.message;

  const res = await cognito.refresh(auth.refreshToken);
  return { ok: !isError(res) };
};
