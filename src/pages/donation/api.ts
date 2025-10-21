import { Txs } from "@better-giving/db";
import type { IPublicDonor } from "@better-giving/donation";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { resp } from "helpers/https";
import { href } from "react-router";
import { getValidatedFormData } from "remix-hook-form";
import type { ActionData } from "types/action";
import type { Route } from "./+types";
import { type Schema, schema } from "./schema";
import { cognito, to_auth } from ".server/auth";
import { TransactWriteCommand, dondb, donordb, onholddb } from ".server/aws/db";
import { type IDonationsCookie, donations_cookie } from ".server/cookie";
import { env } from ".server/env";
import { donation_get, tribute_to_db } from ".server/utils";

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  if (!params.id) throw resp.status(400, "missing donation id");
  const don = await donation_get(params.id);
  if (!don) throw resp.status(404, "donation not found");

  const base_url = url.origin;
  const donate_thanks_path = href("/donations/:id", { id: params.id });
  const donate_path =
    don.to_type === "fund"
      ? href("/donate-fund/:fundId", { fundId: don.to_id })
      : href("/donate/:id", { id: don.to_id });
  const donate_url = `${base_url}${donate_path}`;
  const donate_thanks_url = `${base_url}${donate_thanks_path}`;
  const profile_path =
    don.to_type === "fund"
      ? href("/fundraisers/:fundId", { fundId: don.to_id })
      : href("/marketplace/:id", { id: don.to_id });
  const profile_url = `${base_url}${profile_path}`;

  return { ...don, donate_url, donate_thanks_url, profile_url };
};

export const action = async ({ request, params }: Route.ActionArgs) => {
  const fv = await getValidatedFormData<Schema>(
    request,
    valibotResolver(schema)
  );
  if (fv.errors) return fv;

  const { data: p } = fv;

  const { user } = await cognito.retrieve(request);
  const don = await donation_get(params.id);
  if (!don) throw resp.status(404, "donation not found");

  if (!user) {
    const cookie: IDonationsCookie | null = await donations_cookie.parse(
      request.headers.get("cookie")
    );
    if (!cookie) return to_auth(request);
    const exp = cookie[params.id];
    if (!exp || new Date(exp) < new Date()) {
      return to_auth(request);
    }
  } else {
    if (user.email !== don.from) throw resp.status(403, "not authorized");
  }

  const db = don.status === "onhold" ? onholddb : dondb;

  if (p.type === "tribute") {
    await db.update(don.id, tribute_to_db(p));
    //TODO: send email if there's notif
  }

  if (p.type === "public_msg") {
    const txs = new Txs();
    const tx1 = db.update_txi(don.id, {
      donor_message: p.msg,
    });
    txs.update(tx1);
    const d: IPublicDonor = {
      id: don.id,
      date: new Date().toISOString(),
      amount: don.amount_usd,
      donation_id: don.id,
      donor_id: don.from,
      donor_message: p.msg,
      donor_name: don.from_name,
      env,
      recipient_id: don.to_id,
    };
    const tx2 = donordb.put_txi(d);
    txs.put(tx2);
    const cmd = new TransactWriteCommand({
      TransactItems: txs.all,
    });
    const res = await dondb.client.send(cmd);
    console.info(res);
    return { __ok: "Your message is posted!" } satisfies ActionData;
  }
  if (p.type === "private_msg") {
    await db.update(don.id, {
      msg_to_npo: p.msg,
    });
    // TODO: send email to NPO
    return { __ok: "Your private message is sent!" } satisfies ActionData;
  }
};
