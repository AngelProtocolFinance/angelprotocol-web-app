import type { LoaderFunction } from "@vercel/remix";
import { getISOWeek } from "date-fns";
import { resp } from "helpers/https";
import { QueryCommand, apes } from ".server/aws/db";
import { env } from ".server/env";

export const loader: LoaderFunction = async () => {
  const cmd = new QueryCommand({
    TableName: "metrics",
    IndexName: "gsi1",
    KeyConditionExpression: "gsi1PK = :pk",
    ExpressionAttributeValues: {
      ":pk": `Countries#${env}`,
    },
    ScanIndexForward: false,
  });

  const { Items = [] } = await apes.send(cmd);

  const latest_weeknum = getISOWeek(Items[0].gsi1SK);
  const sorted = Items.toSorted((a, b) => {
    const a7d_v =
      getISOWeek(a.gsi1SK) < latest_weeknum ? 0 : a.totalDonations7d;
    const b7d_v =
      getISOWeek(b.gsi1SK) < latest_weeknum ? 0 : b.totalDonations7d;
    //if both didn't receive donation in the last 7days
    if (!a7d_v && !b7d_v) return b.totalDonations - a.totalDonations;
    return b7d_v - a7d_v;
  });

  return resp.json(sorted.slice(0, 10).map(({ name }) => name));
};
