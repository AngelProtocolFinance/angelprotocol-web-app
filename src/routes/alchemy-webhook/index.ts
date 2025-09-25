import crypto from "node:crypto";
import type { Alert } from "@better-giving/helpers/discord";
import { resp } from "helpers/https";
import type { Route } from "./+types";
import { usd_rate } from "./cg-request";
import type { IPayload, TAlchemyChainId } from "./types";
import { deposit_addrs_envs } from ".server/env";
import { discordAwsMonitor } from ".server/sdks";

const cg_native_ids: { [key in TAlchemyChainId]: string } = {
  "eth-mainnet": "ethereum",
  "bnb-mainnet": "binancecoin",
};

const cg_platform_ids: { [key in TAlchemyChainId]: string } = {
  "eth-mainnet": "ethereum",
  "bnb-mainnet": "binance-smart-chain",
};

const chain_env_key: { [key in TAlchemyChainId]: string } = {
  "eth-mainnet": "eth",
  "bnb-mainnet": "bsc",
};

export const action = async ({ request, params }: Route.ActionArgs) => {
  const chain_id = params.chain_id as TAlchemyChainId;
  // VALIDATE PAYLOAD
  const copy = request.clone();
  const sig = request.headers.get("x-alchemy-signature");
  const body = await copy.text();
  const hmac = crypto.createHmac("sha256", params.signing_key);
  hmac.update(body, "utf8");
  const digest = hmac.digest("hex");

  if (sig !== digest) return resp.status(200, "invalid signature");

  const p: IPayload = await request.json();
  console.info(JSON.stringify(p, null, 2));

  for (const activity of p.event.activity) {
    // we are only interested in receives
    const to = deposit_addrs_envs(chain_env_key[chain_id]);
    if (activity.toAddress !== to) continue;

    let rate = 0;
    let asset = cg_native_ids[chain_id];
    const contract = activity.rawContract.address?.toLowerCase();
    if (contract) {
      const platform = cg_platform_ids[chain_id];
      rate = await usd_rate(
        `api/v3/simple/token_price/${platform}?contract_addresses=${contract}&vs_currencies=usd`,
        contract
      );
      asset = activity.asset;
    } else {
      rate = await usd_rate(
        `api/v3/simple/price?ids=${asset}&vs_currencies=usd`,
        asset
      );
    }

    const usd_value = activity.value * rate;
    const alert: Alert = {
      from: "alchemy-webhook",
      type: "NOTICE",
      title: `New ${chain_id} donation`,
      fields: [
        { name: "Asset", value: asset, inline: true },
        { name: "Chain", value: chain_id, inline: true },
        { name: "From", value: activity.fromAddress },
        { name: "Amount", value: activity.value.toString(), inline: true },
        { name: "USD Value", value: usd_value.toFixed(2), inline: true },
        { name: "Hash", value: activity.hash },
      ],
    };
    console.info(JSON.stringify(alert, null, 2));

    const res = await discordAwsMonitor.sendAlert(alert);
    console.info("discord notif", res.status, res.statusText);
  }

  return resp.status(200, "ok");
};
