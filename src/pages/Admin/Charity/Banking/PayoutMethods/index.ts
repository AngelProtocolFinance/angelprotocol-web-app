import { ap, ver } from "api/api";
import { plusInt } from "api/schema/endow-id";
import { redirectToAuth } from "auth";
import { loadAuth } from "auth/load-auth";
import type { LoaderFunction } from "react-router";
import { parse } from "valibot";
export { default } from "./PayoutMethods";

export const loader: LoaderFunction = async ({ params, request }) => {
  const id = parse(plusInt, params.id);
  const auth = await loadAuth();
  if (!auth) return redirectToAuth(request);

  return ap
    .get(`${ver(1)}/banking-applications`, {
      headers: { authorization: auth.idToken },
      searchParams: {
        requestor: "endowment",
        endowmentID: id,
      },
    })
    .json();
};
