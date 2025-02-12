import type { LoaderFunctionArgs } from "@remix-run/node";
import { plusInt } from "api/schema/endow-id";
import { parse } from "valibot";
import { cognito } from ".server/auth";
import { generateZapierApiKey } from ".server/npo-integrations";

export async function loader({ params, request }: LoaderFunctionArgs) {
  const { user } = await cognito.retrieve(request);
  if (!user?.groups.includes("ap-admin")) {
    return new Response(null, { status: 401 });
  }

  const id = parse(plusInt, params.id);
  const apiKey = await generateZapierApiKey(id);
  return new Response(apiKey);
}
