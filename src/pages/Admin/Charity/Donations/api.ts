import type { LoaderFunction } from "@vercel/remix";
import { ap, ver } from "api/api";
import { plusInt } from "api/schema/endow-id";
import * as v from "valibot";
import { cognito, toAuth } from ".server/auth";

export const loader: LoaderFunction = async ({ params, request }) => {
  const from = new URL(request.url);
  const page = from.searchParams.get("page") ?? "1";

  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  return ap.get(`${ver(2)}/donations`, {
    headers: { authorization: user.idToken },
    searchParams: {
      asker: v.parse(plusInt, params.id),
      status: "final",
      page,
    },
  });
};
