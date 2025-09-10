import { $int_gte1, segment } from "@better-giving/schemas";
import type { LoaderFunction } from "@vercel/remix";
import { safeParse, union } from "valibot";
import { npodb } from ".server/aws/db";

export const profileLoader: LoaderFunction = async ({ params }) => {
  const id = safeParse(union([segment, $int_gte1]), params.id);
  if (id.issues) throw new Response(id.issues[0].message, { status: 400 });

  const npo = await npodb.npo(id.output);
  if (!npo) throw new Response(null, { status: 404 });

  return npo;
};
