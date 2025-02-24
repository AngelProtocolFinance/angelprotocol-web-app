import type * as endowDb from "@better-giving/endowment/db";
import type { FundUpdate, SingleFund } from "@better-giving/fundraiser";
import type * as db from "@better-giving/fundraiser/db";
import { tables } from "@better-giving/types/list";
import type { AttrNames } from "@better-giving/types/utils";
import { BatchGetCommand, GetCommand, UpdateCommand, ap } from "./aws/db";
import { dbUpdate } from "./aws/helpers";
import { env } from "./env";

export const cacheControl =
  "public, max-age=0, s-max-age=30, stale-while-revalidate=60";

export const getFund = async (
  fundId: string
): Promise<SingleFund | undefined> => {
  const command = new GetCommand({
    TableName: tables.funds,
    Key: {
      PK: `Fund#${fundId}`,
      SK: `Fund#${fundId}`,
    },
  });

  const res = await ap.send(command);

  const item = res.Item as db.DbRecord | undefined;
  if (!item) return;

  //   const res = await dynamo.send(command);

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
  { target, ...update }: FundUpdate
) => {
  const command = new UpdateCommand({
    TableName: tables.funds,
    Key: { PK: `Fund#${fundId}`, SK: `Fund#${fundId}` } satisfies db.Keys,
    ReturnValues: "ALL_NEW",
    ...dbUpdate({
      ...update,
      ...((target || target === "0") && { target: `${target}` }),
    }),
  });

  return ap.send(command).then((res) => res.Attributes ?? {});
};

export const closeFund = async (fundId: string) => {
  const command = new UpdateCommand({
    TableName: tables.funds,
    Key: { PK: `Fund#${fundId}`, SK: `Fund#${fundId}` } satisfies db.Keys,
    ReturnValues: "ALL_NEW",
    ...dbUpdate({ active: false }),
  });

  return ap.send(command);
};
