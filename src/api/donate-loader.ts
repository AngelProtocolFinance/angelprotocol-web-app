import type { IPrettyBalance } from "@better-giving/balance";
import type { INpo, IProgram } from "@better-giving/endowment";
import { program_id } from "@better-giving/endowment/schema";
import { $int_gte1 } from "@better-giving/schemas";
import { search } from "helpers/https";
import { type LoaderFunctionArgs, data } from "react-router";
import * as v from "valibot";
import { baldb, npodb } from ".server/aws/db";

export interface DonateData {
  id: number;
  endow: INpo;
  /** need to await */
  program?: IProgram;
  balance: Promise<IPrettyBalance>;
}

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const { program } = search(request);
  const pid = v.parse(v.optional(program_id), program);
  const id = v.parse($int_gte1, params.id);
  const endow = await npodb.npo(id);
  if (!endow) throw new Response(null, { status: 404 });

  return data({
    id,
    endow,
    program: pid ? await npodb.npo_program(pid, id) : undefined,
    balance: baldb.npo_balance(id),
  } satisfies DonateData);
};
