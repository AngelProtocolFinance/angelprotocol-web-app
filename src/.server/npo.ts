import type { Endow, EndowUpdate } from "@better-giving/endowment";
import * as db from "@better-giving/endowment/db";
import { UpdateBuilder } from "@better-giving/helpers-db/update-builder";
import { tables } from "@better-giving/types/list";
import { GetCommand, QueryCommand, UpdateCommand, ap } from "./aws/db";
import { env } from "./env";

type K = keyof Endow;
type ArrayValues<T extends readonly unknown[]> = T[number];
type R<T> = T extends K[] ? Pick<Endow, ArrayValues<T>> : Endow;

/**@param id number - endow-id; string - slug */
export async function getNpo<T extends K[]>(
  id: number | string,
  fields?: T
): Promise<R<T> | undefined> {
  const { names, expression } = projection(fields as any);

  if (typeof id === "string") {
    const cmd = new QueryCommand({
      TableName: tables.endowments_v3,
      IndexName: db.endowGsi.slugEnv,
      KeyConditionExpression: "#slug = :slug and #env = :env",
      ExpressionAttributeValues: {
        ":slug": id,
        ":env": env,
      },
      ProjectionExpression: expression,
      ExpressionAttributeNames: {
        ...names,
        "#env": "env" satisfies keyof db.SlugEnvGsi.Keys,
        "#slug": "slug" satisfies keyof db.SlugEnvGsi.Keys,
      },
    });
    const res = await ap.send(cmd);

    const item = res.Items?.[0];
    return item ? (pretty(item) as R<T>) : undefined;
  }

  const getCmd = new GetCommand({
    TableName: tables.endowments_v3,
    Key: {
      PK: `Endow#${id}`,
      SK: env,
    } satisfies db.Endow.Keys,
    ProjectionExpression: expression,
    ExpressionAttributeNames: names,
  });
  const res = await ap.send(getCmd);

  return res.Item ? (pretty(res.Item) as R<T>) : undefined;
}

function projection(fields: string[] = Object.keys(profileFields)) {
  const expression = fields.map((n) => `#${n}`).join(",");
  const names = fields.reduce(
    (prev, curr) => ({ ...prev, [`#${curr}`]: curr }),
    {} as Record<string, string>
  );
  return { expression, names };
}

function pretty(record: Record<string, any>): Endow {
  const { PK, SK, ...endow } = record as db.Endow.DbRecord;
  return endow;
}

const profileFields: { [K in keyof Required<Endow>]: "" } = {
  id: "",
  active_in_countries: "",
  endow_designation: "",
  fiscal_sponsored: "",
  hide_bg_tip: "",
  hq_country: "",
  image: "",
  kyc_donors_only: "",
  logo: "",
  name: "",
  overview: "",
  published: "",
  registration_number: "",
  social_media_urls: "",
  sdgs: "",
  street_address: "",
  tagline: "",
  url: "",
  slug: "",
  claimed: "",
  card_img: "",
  progDonationsAllowed: "",
  allocation: "",
  donateMethods: "",
  increments: "",
  receiptMsg: "",
  fund_opt_in: "",
  env: "",
  target: "",
  referrer: "",
  referrer_expiry: "",
  referral_id: "",
  w_form: "",
};

export const editNpo = async (
  id: number,
  { target, slug, social_media_urls, ...update }: EndowUpdate
) => {
  const updates = new UpdateBuilder();

  if (slug) updates.set("slug", slug);
  if (slug === "") updates.remove("slug");

  if (target || target === "0") {
    updates.set("target", target);
  }

  if (social_media_urls) {
    for (const [k, v] of Object.entries(social_media_urls)) {
      if (v === undefined) continue;
      updates.set(`social_media_urls.${k}`, v);
    }
  }

  for (const [k, v] of Object.entries(update)) {
    if (v === undefined) continue;
    updates.set(k, v);
  }

  const command = new UpdateCommand({
    TableName: tables.endowments_v3,
    Key: { PK: `Endow#${id}`, SK: env } satisfies db.Endow.Keys,
    ReturnValues: "ALL_NEW",
    ...updates.collect(),
  });

  return ap.send(command).then((res) => res.Attributes ?? {});
};
