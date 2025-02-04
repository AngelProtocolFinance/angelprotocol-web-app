import { endowIdParam } from "@better-giving/endowment/schema";
import type { LoaderFunction } from "@vercel/remix";
import * as v from "valibot";
import { cognito } from ".server/auth";
import { npoSfws } from ".server/npo-sfws";

export const loader: LoaderFunction = async ({ params, request }) => {
  const id = v.parse(endowIdParam, params.id);
  const { user } = await cognito.retrieve(request);
  if (!user) return new Response(null, { status: 401 });
  if (!user.endowments.includes(id) && !user.groups.includes("ap-admin"))
    return new Response(null, { status: 403 });

  const page = await npoSfws(id);
  return new Response(JSON.stringify(page), {
    headers: { "content-type": "application/json" },
  });
};
