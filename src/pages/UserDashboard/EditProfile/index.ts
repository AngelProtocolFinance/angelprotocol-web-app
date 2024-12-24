import { ap, ver } from "api/api";
import { getFiatCurrencies } from "api/get/fiat-currencies";
import { loadAuth, redirectToAuth } from "auth";
import type { ActionFunction, LoaderFunction } from "react-router-dom";

export { Component } from "./Form";

export const loader: LoaderFunction = async ({ request }) => {
  const auth = await loadAuth();
  if (!auth) return redirectToAuth(request);
  const currencies = await getFiatCurrencies(auth);
  return { user: auth, ...currencies };
};

export const action: ActionFunction = async ({ request }) => {
  const auth = await loadAuth();
  if (!auth) return redirectToAuth(request);

  const payload = await request.json();
  const res = await ap.patch(`${ver(3)}/users/${auth.email}`, {
    headers: { authorization: auth.idToken },
    json: payload,
  });
  return { ok: res.ok };
};
