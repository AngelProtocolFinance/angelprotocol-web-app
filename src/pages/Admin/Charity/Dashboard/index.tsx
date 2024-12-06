import type { Allocation } from "@better-giving/endowment";
import { getEndow } from "api/get/endow";
import { plusInt } from "api/schema/endow-id";
import { ENVIRONMENT } from "constants/env";
import { APIs } from "constants/urls";
import { type LoaderFunction, defer } from "react-router-dom";
import { version as ver } from "services/helpers";
import type { BalanceTxsPage, EndowmentBalances } from "types/aws";
import * as v from "valibot";
import type { DashboardData } from "./route";

export { default as Component } from "./Dashboard";

export { action } from "../endow-update-action";
export const loader: LoaderFunction = async ({ params, request }) => {
  const url = new URL(request.url);
  const nextPageKey = url.searchParams.get("nextPageKey");

  const id = v.parse(plusInt, params.id);
  return defer({
    alloc: await getAllocation(id),
    bal: await getBalance(id),
    balTxs: await balanceTxs(id, nextPageKey),
  } satisfies DashboardData);
};

const getAllocation = (id: number) =>
  getEndow(id, ["allocation"]).then<Allocation>(
    (data) => data.allocation ?? { cash: 0, liq: 100, lock: 0 }
  );

async function getBalance(id: number) {
  const url = new URL(APIs.apes);
  url.pathname = `${ver(1)}/balances/${id}`;

  return fetch(url).then<EndowmentBalances>((res) => res.json());
}

async function balanceTxs(id: number, nextPageKey: string | null) {
  const url = new URL(APIs.apes);
  if (nextPageKey) url.searchParams.set("nextPageKey", nextPageKey);
  url.pathname = `${ENVIRONMENT}/endowments/${id}/balance-txs`;
  return fetch(url).then<BalanceTxsPage>((res) => res.json());
}
