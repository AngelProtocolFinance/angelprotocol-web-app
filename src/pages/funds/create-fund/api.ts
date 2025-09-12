import { Txs } from "@better-giving/db";
import type { IFund, IFundSettings } from "@better-giving/fundraiser";
import { fund_new } from "@better-giving/fundraiser/schema";
import { adminRoutes, appRoutes } from "constants/routes";
import { search } from "helpers/https";
import {
  type ActionFunction,
  type LoaderFunctionArgs,
  redirect,
} from "react-router";
import { isError } from "types/auth";
import { parse } from "valibot";
import { cognito, toAuth } from ".server/auth";
import { TransactWriteCommand, funddb, npodb, userdb } from ".server/aws/db";
import { env } from ".server/env";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);
  const { npo: id } = search(request);
  const npo = id ? await npodb.npo(+id) : null;
  return npo;
};

export const action: ActionFunction = async ({ request }) => {
  const { user, headers, session } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  const payload = parse(fund_new, await request.json());

  const npoo = payload.npo_owner;
  if (npoo && !user.endowments.includes(npoo)) return { status: 401 };

  interface ICreator {
    id: string;
    isBg: boolean;
    name: string;
  }
  const creator: ICreator | null = await (async (u, n) => {
    if (!npoo) {
      const user_fullname = [u.firstName, u.lastName].filter(Boolean).join(" ");
      return {
        id: u.email,
        isBg: u.groups.includes("ap-admin"),
        name: user_fullname,
      };
    }
    const npo = await npodb.npo(n, ["name"]);
    if (!npo) return null;
    return {
      id: n.toString(),
      isBg: u.groups.includes("ap-admin"),
      name: npo.name,
    };
  })(user, npoo);
  if (!creator) throw `failed to retrieve creator`;

  const id = crypto.randomUUID();
  const { expiration, target, members: ns, ...rest } = payload;
  const members = await npodb.npos_get(ns, [
    "id",
    "claimed",
    "fund_opt_in",
    "hide_bg_tip",
    "donateMethods",
  ]);
  const claims: { claimed: boolean }[] = [];
  for (const m of members) {
    if (
      !(m.fund_opt_in ?? true) &&
      m.claimed && //creator can add themselves even though they have not opted in to be included by others
      m.id !== +creator.id
    )
      throw `Endowment ${m} has not opted in to be included in fund`;
    claims.push({ claimed: m.claimed });
  }
  const all_members_unclaimed = members.every((e) => !e.claimed);

  const settings: IFundSettings = await (async (ms) => {
    if (ms.length < 1) return { hide_bg_tip: false };
    const m = ms[0];
    return {
      hide_bg_tip: m?.hide_bg_tip ?? false,
      donateMethods: m?.donateMethods,
    };
  })(members);

  const fund: IFund = {
    id,
    env,
    active: true,
    /**
     * members who only opted in (defaulted to `true` for unclaimeds ) to be included in the fund shows up as member option in web-app therfore, inclusion === approval,
     * if all members are unclaimed, the fund is not verified by default ( TODO: if one of the members is claimed, the fund should be verified )
     * all funds created by BG-admin are verified by default
     */
    verified: !all_members_unclaimed || creator.isBg,
    donation_total_usd: 0,
    target,
    members: ns,
    expiration,
    settings,
    creator_id: creator.id,
    creator_name: creator.name,
    ...rest,
  };

  const txs = new Txs();
  txs.put(funddb.fund_put_txi(fund));
  txs.put(userdb.userxfund_put_txi(id, user.email));

  const cmd = new TransactWriteCommand({
    TransactItems: txs.all,
  });

  await funddb.client.send(cmd);

  //delay to give room for credentials to be written in db
  await new Promise((r) => setTimeout(r, 500));
  const refreshed = await cognito.refresh(session);
  const commit = isError(refreshed)
    ? undefined
    : { headers: { "set-cookie": refreshed.commit } };

  if (npoo) {
    return redirect(`${appRoutes.admin}/${npoo}/${adminRoutes.funds}`, commit);
  }
  return redirect(`${appRoutes.user_dashboard}/funds`, commit);
};
