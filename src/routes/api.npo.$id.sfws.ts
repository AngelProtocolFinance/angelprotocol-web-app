import type { LoaderFunction } from "@vercel/remix";
import { npoSfws } from ".server/npo-sfws";
import { admin_checks, is_resp } from ".server/utils";

export const loader: LoaderFunction = async (x) => {
  const adm = await admin_checks(x);
  if (is_resp(adm)) return adm;
  const page = await npoSfws(adm.id);
  return new Response(JSON.stringify(page), {
    headers: { "content-type": "application/json" },
  });
};
