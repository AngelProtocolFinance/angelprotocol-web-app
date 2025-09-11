import { $int_gte1, segment } from "@better-giving/schemas";
import { safeParse, union } from "valibot";
import type { Route } from "./+types/profile";
import { npodb } from ".server/aws/db";

export const profile_loader = async ({ params }: Route.LoaderArgs) => {
  const id = safeParse(union([segment, $int_gte1]), params.id);
  if (id.issues) throw new Response(id.issues[0].message, { status: 400 });

  const npo = await npodb.npo(id.output);
  if (!npo) throw new Response(null, { status: 404 });

  return npo;
};
