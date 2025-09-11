import { program_id } from "@better-giving/endowment/schema";
import { resp } from "helpers/https";
import { parse } from "valibot";
import { npoId } from "../common/npo-id";
import type { Route } from "./+types";
import { npodb } from ".server/aws/db";

export const loader = async ({ params }: Route.LoaderArgs) => {
  const pid = parse(program_id, params.programId);
  const id = await npoId(params.id);
  if (typeof id !== "number") return id;
  const prog = await npodb.npo_program(pid, id);
  if (!prog) return resp.status(404);
  return prog;
};
