import { $int_gte1, segment } from "@better-giving/endowment/schema";
import { safeParse, union } from "valibot";
import { getNpo } from ".server/npo";

export const npoId = async (
  idOrSlugParam: string | undefined
): Promise<number | Response> => {
  const id = safeParse(union([segment, $int_gte1]), idOrSlugParam);
  if (id.issues) throw new Response(id.issues[0].message, { status: 400 });

  if (typeof id.output === "number") return id.output;

  const npo = await getNpo(id.output, ["id"]);
  if (!npo) throw new Response(null, { status: 404 });
  return npo.id;
};
