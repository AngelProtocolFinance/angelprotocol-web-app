import type { LoaderFunctionArgs } from "@remix-run/node";
import { isResponse } from "@remix-run/server-runtime/dist/responses";
import { validateApiKey } from "./helpers/validate-api-key";

export async function loader({ request }: LoaderFunctionArgs) {
  const result = await validateApiKey(request.headers.get("x-api-key"));
  if (isResponse(result)) return result;
  //data for connection label
  return new Response(JSON.stringify(result), { status: 200 });
}
