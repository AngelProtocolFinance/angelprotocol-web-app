import type { Endow } from "@better-giving/endowment";
import * as db from "@better-giving/endowment/db";
import { tables } from "@better-giving/types/list";
import { ap } from "./aws/ap";
import { env } from "./env";

type K = keyof Endow;
type ArrayValues<T extends readonly unknown[]> = T[number];
type R<T> = T extends K[] ? Pick<Endow, ArrayValues<T>> : Endow;

export const cacheControl =
  "public, max-age=0, s-max-age=30, stale-while-revalidate=60";
/**@param id number - endow-id; string - slug */
export async function getNpoByIdOrSlug<T extends K[]>(
  id: number | string,
  fields?: T
): Promise<R<T> | undefined> {
  const { names, expression } = projection(fields as any);

  if (typeof id === "string") {
    const res = await ap.DynamoDB.Query({
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

    const item = res.Items?.[0];
    return item ? (pretty(item) as R<T>) : undefined;
  }

  const res = await ap.DynamoDB.GetItem({
    TableName: tables.endowments_v3,
    Key: {
      PK: `Endow#${id}`,
      SK: env,
    } satisfies db.Endow.Keys,
    ProjectionExpression: expression,
    ExpressionAttributeNames: names,
  });

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
};
