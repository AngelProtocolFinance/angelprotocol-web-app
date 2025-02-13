import type { ActionFunction, LoaderFunction } from "@vercel/remix";
import { isResponse, validateApiKey } from "./helpers/validate-api-key";
import { getDonations } from ".server/donations";
import {
  deleteZapierHookUrl,
  saveZapierHookUrl,
} from ".server/npo-integrations";

// get all recent donations
export const loader: LoaderFunction = async ({ request }) => {
  const result = await validateApiKey(request.headers.get("x-api-key"));
  if (isResponse(result)) return result;
  const { npoId } = result;
  const page1 = await getDonations({ asker: npoId, limit: 3 });
  return new Response(JSON.stringify(page1.Items), { status: 200 });
};

export const action: ActionFunction = async ({ request }) => {
  const result = await validateApiKey(request.headers.get("x-api-key"));
  if (isResponse(result)) return result;

  const { npoId } = result;
  const data = await request.json();

  //subscribe
  if (request.method === "POST") {
    const id = await saveZapierHookUrl(data.hookUrl, npoId);
    return new Response(JSON.stringify({ id }), { status: 200 });
  }

  //unsubscribe
  if (request.method === "DELETE") {
    await deleteZapierHookUrl(data.id, npoId);
    return new Response(null, { status: 200 });
  }

  return new Response(null, { status: 405 });
};
