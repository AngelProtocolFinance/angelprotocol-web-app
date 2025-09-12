import type { INpoAdmin } from "@better-giving/user";
import { parseWithValibot } from "conform-to-valibot";
import { redirect } from "react-router";
import type { UserV2 } from "types/auth";
import type { Route } from "./+types/members";
import { schema } from "./schema";
import { npodb, userdb } from ".server/aws/db";
import { admin_checks, is_resp } from ".server/utils";

export interface LoaderData {
  user: UserV2;
  admins: INpoAdmin[];
}

export const members = async (x: Route.LoaderArgs) => {
  const adm = await admin_checks(x);
  if (is_resp(adm)) return adm;
  const admins = await userdb.npo_admins(adm.id);
  return { admins, user: adm } satisfies LoaderData;
};

export const delete_action = async (x: Route.ActionArgs) => {
  const adm = await admin_checks(x);
  if (is_resp(adm)) return adm;
  const { to_remove } = await adm.req.json();
  await userdb.userxnpo_del(adm.id, to_remove);

  return { ok: true };
};

export const add_action = async (x: Route.ActionArgs) => {
  const adm = await admin_checks(x);
  if (is_resp(adm)) return adm;

  const fv = await adm.req.formData();
  const payload = parseWithValibot(fv, { schema: schema([]) });
  if (payload.status !== "success") return payload.reply();

  const npo = await npodb.npo(adm.id, ["name"]);
  if (!npo) return { status: 404 };

  await userdb.npo_admin_tx(adm.id, {
    endowName: npo.name,
    invitee: payload.value.email,
    inviteeFirstName: payload.value.firstName,
    invitor: adm.email,
  });

  return redirect("..");
};
