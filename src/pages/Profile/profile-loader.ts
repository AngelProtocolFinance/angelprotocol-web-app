import { endowIdParam, segment } from "@better-giving/endowment/schema";
import type { LoaderFunction } from "@vercel/remix";
import { safeParse, union } from "valibot";
import { getNpoByIdOrSlug } from ".server/npo";

export const profileLoader: LoaderFunction = async ({ params }) => {
  const id = safeParse(union([segment, endowIdParam]), params.id);
  if (id.issues) throw new Response(id.issues[0].message, { status: 400 });

  const npo = await getNpoByIdOrSlug(id.output);
  if (!npo) throw new Response(null, { status: 404 });

  return npo;
};
