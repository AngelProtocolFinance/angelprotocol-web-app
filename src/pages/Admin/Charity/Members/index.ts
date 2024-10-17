import { loadAuth } from "auth/load-auth";
import { APIs } from "constants/urls";
import { cacheGet } from "helpers/cache-get";
import type { LoaderFunction } from "react-router-dom";
import { version } from "services/helpers";

export { default as Component } from "./Members";

export const loader: LoaderFunction = async ({ params }) => {
  const auth = await loadAuth();
  if (!auth) throw `user must have been authenticated`;

  const url = new URL(APIs.aws);
  url.pathname = `${version(2)}/endowments/${params.id}/admins`;
  const req = new Request(url);
  req.headers.set("authorization", auth.idToken);

  return cacheGet(req);
};
