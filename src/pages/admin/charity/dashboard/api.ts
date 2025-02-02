import type { Allocation } from "@better-giving/endowment";
import type { LoaderFunction } from "@vercel/remix";
import { apes, ver } from "api/api";
import { getEndow } from "api/get/endow";
import { plusInt } from "api/schema/endow-id";
import type { EndowmentBalances } from "types/aws";
import * as v from "valibot";
import { endowUpdate } from "../endow-update-action";
import { cognito, toAuth } from ".server/auth";

const getAllocation = (id: number) =>
  getEndow(id, ["allocation"]).then<Allocation>(
    (data) => data.allocation ?? { cash: 0, liq: 100, lock: 0 }
  );

async function getBalance(id: number) {
  return apes.get<EndowmentBalances>(`${ver(1)}/balances/${id}`).json();
}

export interface DashboardData {
  id: number;
  alloc: Allocation;
  bal: EndowmentBalances;
}

export const endowUpdateAction = endowUpdate({ redirect: "." });
export const dashboardData: LoaderFunction = async ({ params, request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  const id = v.parse(plusInt, params.id);
  return {
    id,
    alloc: await getAllocation(id),
    bal: await getBalance(id),
  } satisfies DashboardData;
};
