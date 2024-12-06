import { loadAuth, redirectToAuth } from "auth";
import { APIs } from "constants/urls";
import { type LoaderFunction, defer } from "react-router-dom";
import { version as v } from "services/helpers";

export { Component } from "./Application";

export const loader: LoaderFunction = async ({ params, request }) => {
  const auth = await loadAuth();
  if (!auth) return redirectToAuth(request);

  const url = new URL(APIs.aws);
  url.pathname = `${v(1)}/registrations/${params.id}`;

  const req = new Request(url);
  req.headers.set("authorization", auth.idToken);

  return defer({
    application: fetch(req).then((res) => res.json()),
    user: auth,
  });
};
