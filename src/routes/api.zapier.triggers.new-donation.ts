import type { ActionFunction } from "@vercel/remix";
import {
  decodeApiKey,
  deleteZapierHookUrl,
  getZapierApiKey,
  saveZapierHookUrl,
} from ".server/npo-integrations";

// get all recent donations
// export const loader: LoaderFunction = ({ request }) => {};

export const action: ActionFunction = async ({ request }) => {
  const apiKey = request.headers.get("x-api-key");

  if (!apiKey) return new Response(null, { status: 400 });
  const payload = decodeApiKey(apiKey);

  const retrieved: string | undefined = await getZapierApiKey(payload.npoId);
  if (!retrieved) return new Response(null, { status: 404 });

  if (retrieved !== apiKey) return new Response(null, { status: 401 });

  const data = await request.json();

  //subscribe
  if (request.method === "POST") {
    const id = await saveZapierHookUrl(data.hookUrl, payload.npoId);
    return new Response(JSON.stringify({ id }), { status: 200 });
  }

  //unsubscribe
  if (request.method === "DELETE") {
    await deleteZapierHookUrl(data.id, payload.npoId);
    return new Response(null, { status: 200 });
  }
};
