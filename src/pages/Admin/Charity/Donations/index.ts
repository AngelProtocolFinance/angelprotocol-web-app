import { ap, ver } from "api/api";
import { plusInt } from "api/schema/endow-id";
import { loadAuth } from "auth/load-auth";
import type { LoaderFunction } from "react-router";
import * as v from "valibot";

export { default as Component } from "./Donations";

export const loader: LoaderFunction = async ({ params, request }) => {
  const from = new URL(request.url);
  const page = from.searchParams.get("page") ?? "1";

  const auth = await loadAuth();
  if (!auth) throw `user must have been authenticated at this point`;

  return ap.get(`${ver(2)}/donations`, {
    headers: { authorization: auth.idToken },
    searchParams: {
      asker: v.parse(plusInt, params.id),
      status: "final",
      page,
    },
  });
};
