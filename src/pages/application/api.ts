import type { IReg } from "@better-giving/reg";
import { reg_id } from "@better-giving/reg/schema";
import type { V2RecipientAccount } from "@better-giving/wise";
import type { UserV2 } from "types/auth";
import { parse } from "valibot";
import type { Route } from "./+types";
import { cognito, to_auth } from ".server/auth";
import { regdb } from ".server/aws/db";
import { wise } from ".server/sdks";

export interface LoaderData {
  user: UserV2;
  reg: IReg;
  wacc: V2RecipientAccount;
}

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return to_auth(request, headers);

  const id = parse(reg_id, params.id);

  const reg = await regdb.reg(id);
  if (!reg) throw new Response("Registration not found", { status: 404 });

  if (!reg.o_bank_id) throw `No bank account associated with application`;

  const wacc = await wise.v2_account(+reg.o_bank_id);

  return {
    reg,
    user,
    wacc,
  } satisfies LoaderData;
};
