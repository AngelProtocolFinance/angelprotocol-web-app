import { endowIdParam } from "@better-giving/endowment/schema";
import type { LoaderFunction } from "@vercel/remix";
import * as v from "valibot";
import { cognito } from ".server/auth";
import { npoTxs } from ".server/npo-txs";

export const loader: LoaderFunction = async ({ params, request }) => {
  const { searchParams: s } = new URL(request.url);
  const id = v.parse(endowIdParam, params.id);
  const key = v.parse(
    v.nullable(v.pipe(v.string(), v.base64())),
    s.get("nextKey")
  );

  console.log({ id, key });

  const { user } = await cognito.retrieve(request);
  if (!user) return new Response(null, { status: 401 });
  if (!user.endowments.includes(id)) return new Response(null, { status: 403 });

  const page = await npoTxs(id, key);
  return new Response(JSON.stringify(page), {
    headers: { "content-type": "application/json" },
  });
};
