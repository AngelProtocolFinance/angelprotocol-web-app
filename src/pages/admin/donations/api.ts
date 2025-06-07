import type { LoaderFunction } from "@vercel/remix";
import { plusInt } from "api/schema/endow-id";
import * as v from "valibot";
import { cognito, toAuth } from ".server/auth";
import { get_donations } from ".server/donations";

export const loader: LoaderFunction = async ({ params, request }) => {
  const from = new URL(request.url);
  const pageNum = from.searchParams.get("page") ?? "1";

  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  const page = await get_donations({
    asker: v.parse(plusInt, params.id),
    status: "final",
    page: +pageNum,
  });

  return page;
};
