import { tables } from "@better-giving/types/list";
import type * as db from "@better-giving/user/db";
import type { EndowmentBookmark } from "../types/aws";
import { ap } from "./aws/ap";
import { env } from "./env";
import { getNpoByIdOrSlug } from "./npo";
export async function getUserBookmarks(
  userId: string
): Promise<EndowmentBookmark[]> {
  const items = await ap.DynamoDB.Query({
    TableName: tables.usersV2,
    KeyConditionExpression: "PK = :pk AND begins_with(SK, :skSubstr)",
    ExpressionAttributeValues: {
      ":pk": `Email#${userId}` satisfies db.UserBookmark.Key["PK"],
      ":skSubstr": `BM#${env}#`,
    },
  }).then<db.UserBookmark.DBRecord[]>((res) => (res.Items || []) as any);

  const bookmarks: EndowmentBookmark[] = [];
  for (const item of items) {
    const endow = await getNpoByIdOrSlug(item.endowID, ["id", "name", "logo"]);
    if (!endow) continue;
    bookmarks.push({ ...endow, endowId: item.endowID });
  }
  return bookmarks;
}

export async function deleteBookmark(userId: string, bookmarkId: number) {
  return ap.DynamoDB.DeleteItem({
    TableName: tables.usersV2,
    Key: {
      PK: `Email#${userId}`,
      SK: `BM#${env}#${bookmarkId}`,
    } satisfies db.UserBookmark.Key,
  });
}

export async function createBookmark(userId: string, endowId: number) {
  await ap.DynamoDB.PutItem({
    TableName: "UsersV2",
    Item: {
      PK: `Email#${userId}`,
      SK: `BM#${env}#${endowId}`,
      endowID: endowId,
      email: userId,
    } satisfies db.UserBookmark.DBRecord,
  });

  return { id: endowId };
}
