import type { LoaderFunction } from "@vercel/remix";
import { ap, ver } from "api/api";
import { plusInt } from "api/schema/endow-id";
import type { PayoutMethod } from "types/applications";
import { parse } from "valibot";
import { cognito, toAuth } from ".server/auth";

export interface LoaderData {
  methods: PayoutMethod[];
}

export const loader: LoaderFunction = async ({ params, request }) => {
  const id = parse(plusInt, params.id);
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  const methods = await ap
    .get(`${ver(1)}/banking-applications`, {
      headers: { authorization: user.idToken },
      searchParams: {
        requestor: "endowment",
        endowmentID: id,
      },
    })
    .json();

  return { methods };
};
