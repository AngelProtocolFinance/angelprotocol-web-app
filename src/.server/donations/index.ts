import type {
  Donation,
  DonationsPage,
  DonationsQueryParamsParsed,
} from "types/donations";

import { tables } from "@better-giving/types/list";
import type { Earning, EarningsPage } from "types/referrals";
import { QueryCommand, apes } from "../aws/db";
import { env as nv } from "../env";
import { askerIsDonor, toItems, toSorted } from "./helpers";
import type { DBRecord, Index, Key } from "./types";

export const getDonations = async (
  params: DonationsQueryParamsParsed,
  environment = nv
): Promise<DonationsPage> => {
  const { page = 1, limit = 10, asker, status = "final", ...p } = params;

  const filterExpression = [
    (() => {
      if (p.startDate && p.endDate) {
        return "#date BETWEEN :start_date AND :end_date";
      }
      if (p.startDate) return "#date >= :start_date";
      if (p.endDate) return "#date <= :end_date";
    })(),
    p.recipientName && "#recipient_name = :recipient_name",
    p.symbol && "#symbol = :symbol",
    p.viaId && "#via_id = :via_id",
    status !== "final" && "#status = :status",
    "#env = :env",
  ]
    .filter(Boolean)
    .map((f) => `(${f})`)
    .join("AND");

  let startKey: Record<string, any> | undefined;
  let items: Donation.Item[] = [];
  do {
    const table =
      status === "final" ? tables.donations : tables.on_hold_donations;
    const index: Index = askerIsDonor(asker)
      ? "Email_Index"
      : "EndowmentId_Index";
    const askerName: Key = askerIsDonor(asker) ? "email" : "endowmentId";

    const command = new QueryCommand({
      ExclusiveStartKey: startKey,
      TableName: table,
      IndexName: index,
      KeyConditionExpression: "#asker = :asker",
      FilterExpression: filterExpression,
      ExpressionAttributeNames: {
        "#asker": askerName,
        "#env": "network" satisfies Key,
        ...(p.recipientName && {
          "#recipient_name": "charityName" satisfies Key,
        }),
        ...((p.startDate || p.endDate) && {
          "#date": "transactionDate" satisfies Key,
        }),
        ...(p.symbol && {
          "#symbol": "denomination" satisfies Key,
        }),
        ...(p.viaId && {
          "#via_id": "chainId" satisfies Key,
        }),
        ...(status !== "final" && {
          "#status": "status" satisfies Key,
        }),
      },
      ExpressionAttributeValues: {
        ":env": environment,
        ":asker": asker,
        ...(p.startDate && { ":start_date": p.startDate }),
        ...(p.endDate && { ":end_date": p.endDate }),
        ...(p.recipientName && { ":recipient_name": p.recipientName }),
        ...(p.symbol && { ":symbol": p.symbol }),
        ...(p.viaId && { ":via_id": p.viaId }),
        ...(status !== "final" && { ":status": status }),
      },
    });

    const result = await apes.send(command);
    items.push(...toItems((result.Items || []) as DBRecord[], asker));
    startKey = result.LastEvaluatedKey;
  } while (startKey);

  if (items.length === 0) return { Items: [] };

  const numItems = items.length;
  const start = (page - 1) * limit;
  const end = Math.min(page * limit, numItems);

  return {
    Items: toSorted(items, "desc", "date").slice(start, end),
    nextPage: end === numItems ? undefined : page + 1,
  };
};

export const getEarnings = async (
  referrer: string,
  nextKey: string | null,
  limit = 10
): Promise<EarningsPage> => {
  const command = new QueryCommand({
    TableName: tables.donations,
    IndexName: "Referrer-FinalizedDate_Index",
    KeyConditionExpression: "#referrer = :referrer",
    ExpressionAttributeNames: {
      "#referrer": "referrer",
    },
    ExpressionAttributeValues: {
      ":referrer": referrer,
    },
    Limit: limit,
    ScanIndexForward: false,
    ExclusiveStartKey: nextKey ? JSON.parse(nextKey) : undefined,
  });

  const result = await apes.send(command);
  const items = (result.Items || []) as DBRecord[];
  const nextPageKey = result.LastEvaluatedKey
    ? JSON.stringify(result.LastEvaluatedKey)
    : undefined;

  return {
    items: items.map<Earning>((x) => ({
      amount:
        (x.referrer_commission?.from_fee ?? 0) +
        (x.referrer_commission?.from_tip ?? 0),
      date: x.transactionDate,
      donation: {
        id: x.transactionId,
        to_id: x.endowmentId.toString(),
        to_name: x.charityName,
      },
      status: x.referrer_commission?.transfer_id ? "paid" : "pending",
    })),
    nextKey: nextPageKey,
  };
};
