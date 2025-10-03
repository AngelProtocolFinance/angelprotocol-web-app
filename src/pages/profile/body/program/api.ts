import { program_id } from "@better-giving/endowment/schema";
import { resp } from "helpers/https";
import { parse } from "valibot";
import { npo_id } from "../../npo-id";
import type { Route } from "./+types";
import { npodb } from ".server/aws/db";

export const loader = async ({ params }: Route.LoaderArgs) => {
  const pid = parse(program_id, params.programId);
  const id = npo_id(params.id);

  const npo = await npodb.npo(id, ["id"]);
  if (!npo) return resp.status(404);

  const prog = await npodb.npo_program(pid, npo.id);
  if (!prog) return resp.status(404);

  return prog;
};
