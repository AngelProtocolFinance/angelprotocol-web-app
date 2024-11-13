import { plusInt } from "api/schema/endow-id";
import { loadAuth } from "auth/load-auth";
import { APIs } from "constants/urls";
import { cacheGet } from "helpers/cache-get";
import type { LoaderFunction } from "react-router-dom";
import { version as v } from "services/helpers";
import { parse } from "valibot";
export { default } from "./PayoutMethods";

export const loader: LoaderFunction = async ({ params }) => {
  const id = parse(plusInt, params.id);
  const auth = await loadAuth();
  if (!auth) throw "auth is required up higher";

  const url = new URL(APIs.aws);
  url.pathname = `/${v(1)}/banking-applications`;
  url.searchParams.set("requestor", "endowment");
  url.searchParams.set("endowmentID", id.toString());

  const req = new Request(url);
  req.headers.set("authorization", auth.idToken);
  return cacheGet(req).then((res) => res.json());
};
