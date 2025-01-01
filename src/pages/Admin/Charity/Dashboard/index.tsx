import type { Allocation } from "@better-giving/endowment";
import { apes, toSearch, ver } from "api/api";
import { getEndow } from "api/get/endow";
import { plusInt } from "api/schema/endow-id";
import { loadAuth, redirectToAuth } from "auth";
import type { LoaderFunction } from "react-router";
import type { BalanceTxsPage, EndowmentBalances } from "types/aws";
import * as v from "valibot";
import { endowUpdate } from "../endow-update-action";
import type { DashboardData } from "./route";

export { default } from "./Dashboard";
export const clientAction = endowUpdate({ redirect: "." });
export const clientLoader: LoaderFunction = async ({ params, request }) => {
  const auth = await loadAuth();
  if (!auth) return redirectToAuth(request);
  const url = new URL(request.url);
  const nextPageKey = url.searchParams.get("nextPageKey");

  const id = v.parse(plusInt, params.id);
  return {
    alloc: await getAllocation(id),
    bal: await getBalance(id),
    balTxs: await balanceTxs(id, nextPageKey, auth.idToken),
  } satisfies DashboardData;
};

const getAllocation = (id: number) =>
  getEndow(id, ["allocation"]).then<Allocation>(
    (data) => data.allocation ?? { cash: 0, liq: 100, lock: 0 }
  );

async function getBalance(id: number) {
  return apes.get<EndowmentBalances>(`${ver(1)}/balances/${id}`).json();
}

async function balanceTxs(
  id: number,
  nextPageKey: string | null,
  idToken: string
) {
  return apes
    .get<BalanceTxsPage>(`endowments/${id}/balance-txs`, {
      searchParams: toSearch({ nextPageKey }),
      headers: { authorization: idToken },
    })
    .json();
}
