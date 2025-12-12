import type { INpo, IProgram } from "@better-giving/endowment";
import { program_id } from "@better-giving/endowment/schema";
import { $int_gte1 } from "@better-giving/schemas";
import { search } from "helpers/https";
import type { IPrettyBalance } from "lib/balance";
import { type LoaderFunctionArgs, data } from "react-router";
import type { UserV2 } from "types/auth";
import * as v from "valibot";
import { cognito } from ".server/auth";
import { baldb, npodb } from ".server/aws/db";

export interface DonateData {
  id: number;
  endow: INpo;
  /** need to await */
  program?: IProgram;
  balance: Promise<IPrettyBalance>;
  user?: UserV2;
  base_url: string;
}

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const { programId } = search(request);
  const pid = v.parse(v.optional(program_id), programId);
  const id = v.parse($int_gte1, params.id);
  const endow = await npodb.npo(id);
  if (!endow) throw new Response(null, { status: 404 });

  const { user } = await cognito.retrieve(request);

  return data({
    id,
    endow,
    program: pid ? await npodb.npo_program(pid, id) : undefined,
    balance: baldb.npo_balance(id),
    user,
    base_url: new URL(request.url).origin,
  } satisfies DonateData);
};
