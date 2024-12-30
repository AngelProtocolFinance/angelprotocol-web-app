import { ap, ver } from "api/api";
import { loadAuth, redirectToAuth } from "auth";
import type { LoaderFunction } from "react-router";

export { Component } from "./Application";

export const loader: LoaderFunction = async ({ params, request }) => {
  const auth = await loadAuth();
  if (!auth) return redirectToAuth(request);

  const application = ap
    .get(`${ver(1)}/registrations/${params.id}`, {
      headers: { authorization: auth.idToken },
    })
    .json();

  return {
    application,
    user: auth,
  };
};
