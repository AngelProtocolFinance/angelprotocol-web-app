import type { LoaderFunction } from "@vercel/remix";
import { ap, ver } from "api/api";
import { plusInt } from "api/schema/endow-id";
import { cognito, redirectToAuth } from "auth";
import { parse } from "valibot";
export { default } from "./PayoutMethods";

export const loader: LoaderFunction = async ({ params, request }) => {
  const id = parse(plusInt, params.id);
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return redirectToAuth(request, headers);

  return ap
    .get(`${ver(1)}/banking-applications`, {
      headers: { authorization: user.idToken },
      searchParams: {
        requestor: "endowment",
        endowmentID: id,
      },
    })
    .json();
};
