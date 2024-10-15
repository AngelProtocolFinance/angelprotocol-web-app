import { loadAuth } from "auth/load-auth";
import { APIs } from "constants/urls";
import { cacheGet } from "helpers/cache-get";
import type { LoaderFunction } from "react-router-dom";
import { version as ver } from "services/helpers";
import * as v from "valibot";

export { default as Component } from "./Donations";

const id = v.pipe(
  v.string(),
  v.transform((x) => +x),
  v.number(),
  v.integer(),
  v.minValue(1),
  v.transform((x) => x.toString())
);

export const loader: LoaderFunction = async ({ params, request }) => {
  const from = new URL(request.url);
  const page = from.searchParams.get("page") ?? "1";

  const auth = await loadAuth();
  if (!auth) throw `user must have been authenticated at this point`;

  const url = new URL(APIs.aws);
  url.pathname = `${ver(2)}/donations`;
  url.searchParams.set("asker", v.parse(id, params.id));
  url.searchParams.set("status", "final");
  url.searchParams.set("page", page);

  const req = new Request(url);
  req.headers.set("authorization", auth.idToken);

  return cacheGet(req);
};
