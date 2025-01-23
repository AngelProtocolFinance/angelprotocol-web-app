import type {
  Application,
  Page,
  QueryParams,
} from "@better-giving/registration/approval";
import { maxDate, minDate } from "@better-giving/registration/constants";
import {
  type ApplicationDbRecord,
  type Regs,
  sansKeys,
} from "@better-giving/registration/db";
import { tables } from "@better-giving/types/list";
import { ap } from "./aws/ap";
import { env } from "./env";

export async function getRegs(params: QueryParams): Promise<Page> {
  const { startDate = minDate, endDate = maxDate, status } = params;
  const skStart: Regs["gsi2SK"] = `${status ?? "02"}#${startDate}`;
  const skEnd: Regs["gsi2SK"] = `${status ?? "04"}#${endDate}`;

  const startKey = params.nextPageKey
    ? JSON.parse(Buffer.from(params.nextPageKey, "base64").toString())
    : undefined;

  const query: any = {
    TableName: tables.registration,
    IndexName: "gsi2",
    KeyConditionExpression: `gsi2PK = :pk AND gsi2SK BETWEEN :start AND :end`,
    ExpressionAttributeValues: {
      ":pk": `Regs#${env}` satisfies Regs["gsi2PK"],
      ":start": skStart,
      ":end": skEnd,
    },
    ExclusiveStartKey: startKey,
    Limit: 15,
  };

  if (params.country) {
    query.FilterExpression = "#org.#hq_country = :country";
    query.ExpressionAttributeNames = {
      ...query.ExpressionAttributeNames,
      "#org": "org" satisfies keyof Application,
      "#hq_country": "hq_country" satisfies keyof Application["org"],
    };
    query.ExpressionAttributeValues = {
      ...query.ExpressionAttributeValues,
      ":country": params.country,
    };
  }

  console.log(query);

  const res = await ap.DynamoDB.Query(query);

  console.log(res);

  const items = (res.Items || []) as unknown as ApplicationDbRecord[];
  return {
    items: items.map((i) => ({
      ...sansKeys(i),
      org_name: i.contact.org_name,
      hq_country: i.org.hq_country,
    })),
    nextPageKey: nextKeyBase64(res.LastEvaluatedKey),
  };
}

export function nextKeyBase64(key: Record<string, any> | undefined) {
  return key ? Buffer.from(JSON.stringify(key)).toString("base64") : undefined;
}
