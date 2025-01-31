import { tables } from "@better-giving/types/list";
import type * as db from "@better-giving/user/db";
import type { EndowmentBookmark } from "../types/aws";
import { DeleteCommand, PutCommand, QueryCommand, ap } from "./aws/db";
import { env } from "./env";
import { getNpoByIdOrSlug } from "./npo";
export async function getUserBookmarks(
  userId: string
): Promise<EndowmentBookmark[]> {
  const command = new QueryCommand({
    TableName: tables.usersV2,
    KeyConditionExpression: "PK = :pk AND begins_with(SK, :skSubstr)",
    ExpressionAttributeValues: {
      ":pk": `Email#${userId}` satisfies db.UserBookmark.Key["PK"],
      ":skSubstr": `BM#${env}#`,
    },
  });
  const items = await ap
    .send(command)
    .then<db.UserBookmark.DBRecord[]>((res) => (res.Items || []) as any);

  const bookmarks: EndowmentBookmark[] = [];
  for (const item of items) {
    const endow = await getNpoByIdOrSlug(item.endowID, ["id", "name", "logo"]);
    if (!endow) continue;
    bookmarks.push({ ...endow, endowId: item.endowID });
  }
  return bookmarks;
}

export async function deleteBookmark(userId: string, bookmarkId: number) {
  const cmd = new DeleteCommand({
    TableName: tables.usersV2,
    Key: {
      PK: `Email#${userId}`,
      SK: `BM#${env}#${bookmarkId}`,
    } satisfies db.UserBookmark.Key,
  });
  return ap.send(cmd);
}

export async function createBookmark(userId: string, endowId: number) {
  const cmd = new PutCommand({
    TableName: "UsersV2",
    Item: {
      PK: `Email#${userId}`,
      SK: `BM#${env}#${endowId}`,
      endowID: endowId,
      email: userId,
    } satisfies db.UserBookmark.DBRecord,
  });
  await ap.send(cmd);

  return { id: endowId };
}
