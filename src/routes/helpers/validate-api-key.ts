import {
  type ApiKeyPayload,
  decodeApiKey,
  getZapierApiKey,
} from ".server/npo-integrations";

/**@param apiKey - from header */
export async function validateApiKey(
  apiKey: string | null
): Promise<ApiKeyPayload | Response> {
  //no api key in header
  if (!apiKey) return new Response(null, { status: 400 });
  const payload = decodeApiKey(apiKey);

  //npoId indeed has api key saved/active
  const retrieved: string | undefined = await getZapierApiKey(
    payload.npoId,
    payload.env
  );
  if (!retrieved) return new Response(null, { status: 404 });

  // api key used in this request is the same as the one saved/active
  if (retrieved !== apiKey) return new Response(null, { status: 401 });
  return payload;
}

export const isResponse = (x: any): x is Response => x instanceof Response;
