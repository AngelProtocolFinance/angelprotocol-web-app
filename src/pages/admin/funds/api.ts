import { UpdateBuilder } from "@better-giving/db";
import type { INpo } from "@better-giving/endowment";
import { FundDb, type FundItem } from "@better-giving/fundraiser";
import { fund_id } from "@better-giving/fundraiser/schema";
import type { ActionFunction, LoaderFunction } from "@vercel/remix";
import type { ActionData } from "types/action";
import type { UserV2 } from "types/auth";
import { parse } from "valibot";
import { UpdateCommand, funddb, npodb } from ".server/aws/db";
import { get_funds_npo_memberof } from ".server/funds";
import { admin_checks, is_resp } from ".server/utils";

export interface LoaderData {
  user: UserV2;
  funds: FundItem[];
  endow: INpo;
}

export const loader: LoaderFunction = async (x) => {
  const adm = await admin_checks(x);
  if (is_resp(adm)) return adm;

  const endow = await npodb.npo(adm.id);
  if (!endow) return { status: 404 };

  const funds = await get_funds_npo_memberof(endow.id, {
    npo_profile_featured: false,
  });
  return { endow, funds, user: adm } satisfies LoaderData;
};

export const action: ActionFunction = async (x) => {
  const adm = await admin_checks(x);
  if (is_resp(adm)) return adm;

  const fv = await adm.req.formData();
  const fid = parse(fund_id, fv.get("fund_id"));

  const fund = await funddb.fund(fid);
  if (!fund) return { status: 404 };
  const idx_in_members = fund.members.indexOf(adm.id);
  if (idx_in_members === -1) {
    return { status: 400, statusText: `${adm.id} not member of this fund` };
  }

  const upd8 = new UpdateBuilder();
  upd8.remove(`members[${idx_in_members}]`);
  const is_last_member = fund.members.length === 1;
  if (is_last_member) {
    upd8.set("active", false);
  }

  const cmd = new UpdateCommand({
    TableName: FundDb.table,
    Key: funddb.key_fund(fund.id),
    ...upd8.collect(),
  });

  await funddb.client.send(cmd);

  return {
    __ok: "You have successfully opted out of this fund. Changes will take effect shortly.",
  } satisfies ActionData;
};
