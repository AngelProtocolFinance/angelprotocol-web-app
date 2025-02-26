import type { LoaderFunction } from "@vercel/remix";
import {
  integer,
  minValue,
  parse,
  pipe,
  string,
  transform,
  union,
  uuid,
} from "valibot";
import { getPendingIntent } from ".server/crypto-intent/crypto-intent";

const int = pipe(
  string(),
  transform((x) => +x),
  integer(),
  minValue(0)
);
export const loader: LoaderFunction = async ({ params }) => {
  const id = parse(union([pipe(string(), uuid()), int]), params.id);

  const intent = await getPendingIntent(id);
  if (typeof intent === "number") {
    return new Response(null, { status: intent });
  }
  return new Response(JSON.stringify(intent), {
    headers: { "content-type": "application/json" },
  });
};
