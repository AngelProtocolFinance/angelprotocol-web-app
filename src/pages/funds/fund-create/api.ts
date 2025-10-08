import { Txs } from "@better-giving/db";
import { npo } from "@better-giving/endowment/schema";
import type { IFund, IFundSettings } from "@better-giving/fundraiser";
import { $int_gte1 } from "@better-giving/schemas";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { adminRoutes, app_routes } from "constants/routes";
import { resp, search } from "helpers/https";
import {
  type ActionFunction,
  type LoaderFunctionArgs,
  redirect,
} from "react-router";
import { getValidatedFormData } from "remix-hook-form";
import type { IFormInvalid } from "types/action";
import { is_error } from "types/auth";
import { parse } from "valibot";
import { evaluate } from "./evaluate";
import { type FV, schema } from "./schema";
import { cognito, to_auth } from ".server/auth";
import { TransactWriteCommand, funddb, npodb, userdb } from ".server/aws/db";
import { env } from ".server/env";
import { is_resp } from ".server/utils";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return to_auth(request, headers);
  const { npo: id } = search(request);
  if (id) {
    const npo = await npodb.npo(+id);
    if (!npo) return resp.status(404);
    return npo;
  }
  return null;
};

export const action: ActionFunction = async ({ request }) => {
  const { user, headers, session } = await cognito.retrieve(request);
  if (!user) return to_auth(request, headers);
  const { npo: npo_id } = search(request);
  const fv = await getValidatedFormData<FV>(request, valibotResolver(schema));
  if (fv.errors) return fv;

  const { data: d } = fv;

  const evl = await evaluate({
    title: d.name,
    description: d.description.value,
  }).catch((err) => {
    console.error("evaluation failed", err);
    return undefined;
  });

  console.info(evl);

  if (evl && evl.is_spam) {
    if (evl.field === "name") {
      return {
        receivedValues: d,
        errors: { name: { type: "value", message: evl.explanation } },
      } satisfies IFormInvalid<FV>;
    }
    return {
      receivedValues: d,
      errors: {
        description: { value: { type: "value", message: evl.explanation } },
      },
    } satisfies IFormInvalid<FV>;
  }

  const npo_owner = ((n) => {
    if (!n) return undefined;
    const id = parse($int_gte1, n);
    if (!user.endowments.includes(id)) return resp.status(401);
    return id;
  })(npo_id);

  if (is_resp(npo_owner)) return npo_owner;

  interface ICreator {
    id: string;
    isBg: boolean;
    name: string;
  }
  const creator: ICreator | null = await (async (u, n) => {
    if (!n) {
      const user_fullname = [u.first_name, u.last_name]
        .filter(Boolean)
        .join(" ");
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
  })(user, npo_owner);
  if (!creator) throw "failed to retrieve creator";

  const id = crypto.randomUUID();
  const { expiration, members: ms, target, increments } = d;
  const m_ids = ms.map((m) => m.id);
  const members = await npodb.npos_get(m_ids, [
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

  const trgt =
    target.type === "none"
      ? `${0}`
      : target.type === "smart"
        ? "smart"
        : `${+target.value}`;

  const fund: IFund = {
    featured: true,
    npo_owner: npo_owner || 0,
    name: d.name,
    description: d.description.value,
    banner: d.banner,
    logo: d.logo,
    videos: d.videos.map((v) => v.url),
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
    target: trgt,
    members: m_ids,
    expiration,
    settings,
    creator_id: creator.id,
    creator_name: creator.name,
    increments,
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
  const commit = is_error(refreshed)
    ? undefined
    : { headers: { "set-cookie": refreshed.commit } };

  if (npo_owner) {
    const to = `${app_routes.admin}/${npo_owner}/${adminRoutes.funds}`;
    return redirect(to, commit);
  }
  return redirect(`${app_routes.user_dashboard}/funds`, commit);
};
