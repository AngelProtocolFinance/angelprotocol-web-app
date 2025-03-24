import type * as endowDb from "@better-giving/endowment/db";
import type { FundUpdate, SingleFund } from "@better-giving/fundraiser";
import { type SlugEnvGsi, fundGsi } from "@better-giving/fundraiser/db";
import type * as db from "@better-giving/fundraiser/db";
import { tables } from "@better-giving/types/list";
import type { AttrNames } from "@better-giving/types/utils";
import * as v from "valibot";
import { segment } from "../api/schema/segment";
import {
  BatchGetCommand,
  QueryCommand,
  type QueryCommandInput,
  UpdateCommand,
  ap,
} from "./aws/db";
import { UpdateBuilder } from "./aws/update-builder";
import { env } from "./env";

export const getFund = async (
  uuidOrSlug: string
): Promise<SingleFund | undefined> => {
  const queryParams: QueryCommandInput = { TableName: tables.funds, Limit: 1 };
  if (v.UUID_REGEX.test(uuidOrSlug)) {
    const uuid = uuidOrSlug;
    queryParams.KeyConditionExpression = "PK = :PK AND SK = :SK";
    queryParams.ExpressionAttributeValues = {
      ":PK": `Fund#${uuid}` satisfies db.Keys["PK"],
      ":SK": `Fund#${uuid}` satisfies db.Keys["SK"],
    };
  } else {
    const slug = v.parse(segment, uuidOrSlug);
    queryParams.IndexName = fundGsi.slugEnv;
    queryParams.KeyConditionExpression = "slug = :slug AND env = :env";
    queryParams.ExpressionAttributeValues = {
      ":slug": slug satisfies SlugEnvGsi.Keys["slug"],
      ":env": env satisfies SlugEnvGsi.Keys["env"],
    };
  }

  const res = await ap.send(new QueryCommand(queryParams));
  const item = res.Items?.[0] as db.DbRecord | undefined;
  if (!item) return;

  const fund = (({ PK, SK, ...f }) => f)(item);

  if (fund.members.length === 0) {
    return { ...fund, members: [] };
  }

  /// GET ALL MEMBER DETAILS ///
  type Endow = Pick<
    endowDb.Endow.NonKeyAttributes,
    "id" | "name" | "card_img" | "image" | "logo"
  >;
  const fundMemberNames: AttrNames<Endow> = {
    "#card_img": "card_img",
    "#id": "id",
    "#name": "name",
    "#image": "image",
  };

  const batchGet = new BatchGetCommand({
    RequestItems: {
      [tables.endowments_v3]: {
        Keys: fund.members.map((endowId) => {
          return {
            PK: `Endow#${endowId}`,
            SK: env,
          } as endowDb.Endow.Keys;
        }),
        ProjectionExpression: Object.keys(fundMemberNames).join(", "),
        ExpressionAttributeNames: fundMemberNames,
      },
    },
  });
  const { Responses } = await ap.send(batchGet);

  const members = (Responses?.[tables.endowments_v3] ?? []) as Endow[];

  return {
    ...fund,
    members: members.map((m) => ({
      id: m.id,
      name: m.name,
      logo: m.logo || m.card_img,
      banner: m.image,
    })),
  };
};

export const editFund = async (
  fundId: string,
  { target, slug, ...update }: FundUpdate
) => {
  const updates = new UpdateBuilder();

  if (slug) updates.set("slug", slug);
  if (slug === "") updates.remove("slug");

  if (target || target === "0") {
    updates.set("target", target);
  }

  for (const [k, v] of Object.entries(update)) {
    if (v === undefined) continue;
    updates.set(k, v);
  }

  const command = new UpdateCommand({
    TableName: tables.funds,
    Key: { PK: `Fund#${fundId}`, SK: `Fund#${fundId}` } satisfies db.Keys,
    ReturnValues: "ALL_NEW",
    ...updates.collect(),
  });

  return ap.send(command).then((res) => res.Attributes ?? {});
};

export const closeFund = async (fundId: string) => {
  const updates = new UpdateBuilder();
  updates.set("active", false);

  const command = new UpdateCommand({
    TableName: tables.funds,
    Key: { PK: `Fund#${fundId}`, SK: `Fund#${fundId}` } satisfies db.Keys,
    ReturnValues: "ALL_NEW",
    ...updates.collect(),
  });

  return ap.send(command);
};
