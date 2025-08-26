import { endowIdParam, segment } from "@better-giving/endowment/schema";
import type { LoaderFunction } from "react-router";
import { safeParse, union } from "valibot";
import { getNpo } from ".server/npo";

export const profileLoader: LoaderFunction = async ({ params }) => {
  const id = safeParse(union([segment, endowIdParam]), params.id);
  if (id.issues) throw new Response(id.issues[0].message, { status: 400 });

  const npo = await getNpo(id.output);
  if (!npo) throw new Response(null, { status: 404 });

  return npo;
};
