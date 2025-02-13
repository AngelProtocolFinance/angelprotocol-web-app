import type { LoaderFunctionArgs } from "@remix-run/node";
import { decodeApiKey, getZapierApiKey } from ".server/npo-integrations";

export async function loader({ request }: LoaderFunctionArgs) {
  const apiKey = request.headers.get("x-api-key");

  if (!apiKey) return new Response(null, { status: 400 });

  const payload = decodeApiKey(apiKey);

  const retrieved: string | undefined = await getZapierApiKey(payload.npoId);

  if (!retrieved) return new Response(null, { status: 404 });
  if (retrieved !== apiKey) return new Response(null, { status: 401 });

  //data for connection label
  return new Response(JSON.stringify(payload), { status: 200 });
}
