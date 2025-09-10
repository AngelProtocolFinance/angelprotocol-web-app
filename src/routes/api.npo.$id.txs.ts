import type { LoaderFunction } from "@vercel/remix";
import * as v from "valibot";
import { npoTxs } from ".server/npo-txs";
import { admin_checks, is_resp } from ".server/utils";

export const loader: LoaderFunction = async (x) => {
  const { searchParams: s } = new URL(x.request.url);
  const key = v.parse(
    v.nullable(v.pipe(v.string(), v.base64())),
    s.get("nextKey")
  );

  const adm = await admin_checks(x);
  if (is_resp(adm)) return adm;

  const page = await npoTxs(adm.id, key);
  return new Response(JSON.stringify(page), {
    headers: { "content-type": "application/json" },
  });
};
