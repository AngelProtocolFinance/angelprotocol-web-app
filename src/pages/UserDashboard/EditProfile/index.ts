import type { ActionFunction, LoaderFunction } from "@remix-run/react";
import { getFiatCurrencies } from "api/get/fiat-currencies";
import { cognito, loadAuth, redirectToAuth } from "auth";
import { isError } from "types/auth";

export { Component as default } from "./Form";

export const clientLoader: LoaderFunction = async ({ request }) => {
  const auth = await loadAuth();
  if (!auth) return redirectToAuth(request);
  const currencies = await getFiatCurrencies(auth);
  return { user: auth, ...currencies };
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
