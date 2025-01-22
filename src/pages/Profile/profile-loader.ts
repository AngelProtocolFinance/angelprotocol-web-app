import { endowIdParam, segment } from "@better-giving/endowment/schema";
import type { LoaderFunction } from "@vercel/remix";
import { safeParse, union } from "valibot";
import { getNpoByIdOrSlug } from ".server/get-npo";

export const profileLoader: LoaderFunction = async ({ params }) => {
  const id = safeParse(union([segment, endowIdParam]), params.id);
  if (id.issues) {
    return { status: 400, body: id.issues[0].message };
  }

  const npo = await getNpoByIdOrSlug(id.output);
  if (!npo) return { status: 404 };

  return npo;
};
