// import { cognito } from ".server/auth";
import { fundId } from "@better-giving/fundraiser/schema";
import type { LoaderFunction } from "@vercel/remix";
import { plusInt } from "api/schema/endow-id";
import * as v from "valibot";
import { npoDonors } from ".server/npo-donors";

const schema = v.union([fundId, plusInt]);

export const loader: LoaderFunction = async ({ params, request }) => {
  const { searchParams: s } = new URL(request.url);
  const id = v.parse(schema, params.id);
  const key = v.parse(
    v.nullable(v.pipe(v.string(), v.base64())),
    s.get("nextKey")
  );

  const page = await npoDonors(id.toString(), key);
  return new Response(JSON.stringify(page), {
    headers: { "content-type": "application/json" },
  });
};
