import type { INpoBookmark, IUserNpo2 } from "types/user";
import { npodb, userdb } from "./aws/db";
export async function user_bookmarks(user: string): Promise<INpoBookmark[]> {
  const bms = await userdb.user_bookmarks(user);
  const npos = await npodb.npos_get(
    bms.map((x) => x.endowID),
    ["name", "logo", "id"]
  );
  const m = new Map(npos.map((n) => [n.id, n]));

  return bms.map((bm) => ({
    id: bm.endowID,
    name: m.get(bm.endowID)?.name ?? "",
    logo: m.get(bm.endowID)?.logo,
  }));
}

export async function user_npos(user: string): Promise<IUserNpo2[]> {
  const unpos = await userdb.user_npos(user);
  const npos = await npodb.npos_get(
    unpos.map((x) => x.id),
    ["name", "logo", "id"]
  );
  const m = new Map(npos.map((n) => [n.id, n]));
  return unpos.map((x) => ({
    ...x,
    name: m.get(x.id)?.name ?? "",
    logo: m.get(x.id)?.logo,
  }));
}
