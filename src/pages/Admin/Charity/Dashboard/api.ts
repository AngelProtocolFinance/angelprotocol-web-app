import type { Allocation } from "@better-giving/endowment";
import type { LoaderFunction } from "@vercel/remix";
import { apes, toSearch, ver } from "api/api";
import { getEndow } from "api/get/endow";
import { plusInt } from "api/schema/endow-id";
import { cognito, redirectToAuth } from "auth";
import type { BalanceTxsPage, EndowmentBalances } from "types/aws";
import * as v from "valibot";
import { endowUpdate } from "../endow-update-action";

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

export interface DashboardData {
  alloc: Allocation;
  bal: EndowmentBalances;
  balTxs: BalanceTxsPage;
}

export const endowUpdateAction = endowUpdate({ redirect: "." });
export const dashboardData: LoaderFunction = async ({ params, request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return redirectToAuth(request, headers);
  const url = new URL(request.url);
  const nextPageKey = url.searchParams.get("nextPageKey");

  const id = v.parse(plusInt, params.id);
  return {
    alloc: await getAllocation(id),
    bal: await getBalance(id),
    balTxs: await balanceTxs(id, nextPageKey, user.idToken),
  } satisfies DashboardData;
};
